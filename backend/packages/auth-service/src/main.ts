// Auth Service - Entry point

import express, { Express, Request, Response } from 'express';
import { createLogger, loadEnvConfig } from '@media-platform/shared';
import { AuthService, ILoginRequest, IRegisterRequest } from './auth.service';

const logger = createLogger('AuthServiceMain');
const config = loadEnvConfig();

// Initialize Express app
const app: Express = express();
const port = config.port || 3001;

// Middleware
app.use(express.json());

// Initialize Auth Service
const authService = new AuthService(config.jwtSecret, config.jwtExpiration);

// Types for request extensions
interface UserRequest extends Request {
  userId?: string;
}

/**
 * Health check endpoint
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'auth-service',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Register endpoint
 */
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, username } = req.body as IRegisterRequest;

    // Validate input
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Missing required fields: email, password, username',
        },
      });
    }

    // Validate email format
    if (!authService.validateEmail(email)) {
      return res.status(422).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid email format',
        },
      });
    }

    // Validate password strength
    const passwordValidation = authService.validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return res.status(422).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Password does not meet requirements',
          details: { errors: passwordValidation.errors },
        },
      });
    }

    // Validate username
    const usernameValidation = authService.validateUsername(username);
    if (!usernameValidation.valid) {
      return res.status(422).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid username format',
          details: { errors: usernameValidation.errors },
        },
      });
    }

    // Check if email already exists
    logger.info('User registration started', { email, username });
    const existing = await authService.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({
        success: false,
        error: { code: 'CONFLICT', message: 'Email already registered' },
      });
    }

    const passwordHash = await authService.hashPassword(password);
    const user = await authService.createUser({ email, username, passwordHash, firstName, lastName });

    const authResponse = authService.createAuthResponse(user as any);

    res.status(201).json({ success: true, data: authResponse, timestamp: new Date(), requestId: (req as any).id || 'unknown' });
  } catch (error) {
    logger.error('Registration failed', error as Error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Registration failed',
      },
    });
  }
});

/**
 * Login endpoint
 */
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password, deviceId } = req.body as ILoginRequest;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Missing email or password',
        },
      });
    }

    logger.info('Login attempt', { email, deviceId });
    const userRow = await authService.findUserByEmail(email);
    if (!userRow) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
    }

    const valid = await authService.verifyPassword(password, userRow.password_hash || '');
    if (!valid) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
    }

    // Load minimal user object
    const user = {
      id: String(userRow.id),
      email: userRow.email,
      username: userRow.username,
      firstName: '',
      lastName: '',
      subscriptionStatus: 'free' as const,
      isCreator: false,
      darkMode: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const authResponse = authService.createAuthResponse(user as any);

    res.json({ success: true, data: authResponse, timestamp: new Date(), requestId: (req as any).id || 'unknown' });
  } catch (error) {
    logger.error('Login failed', error as Error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Login failed',
      },
    });
  }
});

/**
 * Refresh token endpoint
 */
app.post('/api/auth/refresh-token', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Missing refresh token',
        },
      });
    }

    // TODO: Validate refresh token from database
    // TODO: Generate new access token

    logger.info('Token refresh requested');

    // Mock response
    const mockUser = {
      id: 'user-mock',
      email: 'user@example.com',
      username: 'user',
      firstName: 'Test',
      lastName: 'User',
      subscriptionStatus: 'free' as const,
      isCreator: false,
      darkMode: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const authResponse = authService.createAuthResponse(mockUser);

    res.json({
      success: true,
      data: {
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
        tokenType: 'Bearer',
        expiresIn: authResponse.expiresIn,
      },
      timestamp: new Date(),
      requestId: (req as any).id || 'unknown',
    });
  } catch (error) {
    logger.error('Token refresh failed', error as Error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Token refresh failed',
      },
    });
  }
});

/**
 * Logout endpoint
 */
app.post('/api/auth/logout', (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Missing authorization header',
        },
      });
    }

    // TODO: Invalidate token in database/redis

    logger.info('User logout', { token: authHeader.substring(0, 20) });

    res.status(204).send();
  } catch (error) {
    logger.error('Logout failed', error as Error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Logout failed',
      },
    });
  }
});

/**
 * Error handling middleware
 */
app.use((err: any, req: Request, res: Response) => {
  logger.error('Unhandled error', err);
  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Internal server error',
    },
    timestamp: new Date(),
    requestId: req.id || 'unknown',
  });
});

// Start server
app.listen(port, () => {
  logger.info(`Auth Service running on port ${port}`, {
    service: 'auth-service',
    environment: config.nodeEnv,
  });
});

export default app;

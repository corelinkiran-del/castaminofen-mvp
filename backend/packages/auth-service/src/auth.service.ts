// Auth Service - Main service logic for authentication

import * as crypto from 'crypto';
import { createLogger, IJwtPayload, IUser, ApiException, ERROR_CODES } from '@media-platform/shared';

const logger = createLogger('AuthService');

export interface ILoginRequest {
  email: string;
  password: string;
  deviceId?: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface IAuthResponse {
  userId: string;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export class AuthService {
  constructor(
    private jwtSecret: string,
    private jwtExpiration: number,
  ) {}

  /**
   * Generate JWT token
   */
  generateToken(payload: IJwtPayload): string {
    // This is a simplified version - in production use jsonwebtoken library
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const now = Math.floor(Date.now() / 1000);
    const tokenPayload = {
      ...payload,
      iat: now,
      exp: now + this.jwtExpiration,
    };

    const headerEncoded = Buffer.from(JSON.stringify(header)).toString('base64url');
    const payloadEncoded = Buffer.from(JSON.stringify(tokenPayload)).toString('base64url');

    const signature = crypto
      .createHmac('sha256', this.jwtSecret)
      .update(`${headerEncoded}.${payloadEncoded}`)
      .digest('base64url');

    return `${headerEncoded}.${payloadEncoded}.${signature}`;
  }

  /**
   * Verify JWT token
   */
  verifyToken(token: string): IJwtPayload | null {
    try {
      const [headerEncoded, payloadEncoded, signature] = token.split('.');

      // Verify signature
      const expectedSignature = crypto
        .createHmac('sha256', this.jwtSecret)
        .update(`${headerEncoded}.${payloadEncoded}`)
        .digest('base64url');

      if (signature !== expectedSignature) {
        logger.warn('Invalid token signature', { token: token.substring(0, 20) });
        return null;
      }

      // Parse payload
      const payload = JSON.parse(Buffer.from(payloadEncoded, 'base64url').toString());

      // Check expiration
      if (payload.exp < Math.floor(Date.now() / 1000)) {
        logger.warn('Token expired', { userId: payload.sub });
        return null;
      }

      return payload as IJwtPayload;
    } catch (error) {
      logger.error('Token verification failed', error as Error);
      return null;
    }
  }

  /**
   * Hash password
   */
  async hashPassword(password: string): Promise<string> {
    // This is simplified - use bcrypt in production
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
      .toString('hex');
    return `${salt}$${hash}`;
  }

  /**
   * Verify password
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      const [salt, storedHash] = hash.split('$');
      const computedHash = crypto
        .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
        .toString('hex');
      return computedHash === storedHash;
    } catch (error) {
      logger.error('Password verification failed', error as Error);
      return false;
    }
  }

  /**
   * Validate password strength
   */
  validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate email format
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate username
   */
  validateUsername(username: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (username.length < 3) {
      errors.push('Username must be at least 3 characters');
    }

    if (username.length > 30) {
      errors.push('Username must not exceed 30 characters');
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      errors.push('Username can only contain letters, numbers, underscores, and hyphens');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Generate refresh token
   */
  generateRefreshToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Create auth response
   */
  createAuthResponse(user: IUser): IAuthResponse {
    const tokenPayload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      subscriptionStatus: user.subscriptionStatus,
      isCreator: user.isCreator,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + this.jwtExpiration,
    };

    return {
      userId: user.id,
      email: user.email,
      username: user.username,
      accessToken: this.generateToken(tokenPayload),
      refreshToken: this.generateRefreshToken(),
      tokenType: 'Bearer',
      expiresIn: this.jwtExpiration,
    };
  }
}

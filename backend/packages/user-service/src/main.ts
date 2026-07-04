// User Service - Entry point and implementation

import express, { Express, Request, Response } from 'express';
import { createLogger, loadEnvConfig, IUser } from '@media-platform/shared';

const logger = createLogger('UserService');
const config = loadEnvConfig();

const app: Express = express();
const port = process.env.PORT || 3002;

app.use(express.json());

/**
 * Health check
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'user-service', timestamp: new Date() });
});

/**
 * Get current user profile
 */
app.get('/api/users/me', (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Missing authorization header' },
      });
    }

    // Mock user data
    const user: IUser = {
      id: 'user-123',
      email: 'user@example.com',
      username: 'user_ali',
      firstName: 'علی',
      lastName: 'احمدی',
      bio: 'توضیح درباره من',
      subscriptionStatus: 'premium',
      isCreator: false,
      darkMode: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    res.json({
      success: true,
      data: user,
      timestamp: new Date(),
      requestId: 'req-001',
    });
  } catch (error) {
    logger.error('Failed to get user profile', error as Error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR' } });
  }
});

/**
 * Update user profile
 */
app.put('/api/users/me', (req: Request, res: Response) => {
  try {
    const { firstName, lastName, bio, darkMode } = req.body;

    logger.info('User profile updated', { firstName, lastName });

    res.json({
      success: true,
      data: { id: 'user-123', firstName, lastName, bio, darkMode, updatedAt: new Date() },
      timestamp: new Date(),
      requestId: 'req-001',
    });
  } catch (error) {
    logger.error('Failed to update profile', error as Error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR' } });
  }
});

/**
 * Get user library
 */
app.get('/api/users/me/library', (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    res.json({
      success: true,
      data: [
        {
          id: 'lib-001',
          contentId: 'content-1',
          title: 'پادکست علمی',
          creatorName: 'محمد',
          addedAt: new Date(),
          isDownloaded: false,
        },
      ],
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      timestamp: new Date(),
      requestId: 'req-001',
    });
  } catch (error) {
    logger.error('Failed to get library', error as Error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR' } });
  }
});

/**
 * Add to library
 */
app.post('/api/users/me/library', (req: Request, res: Response) => {
  try {
    const { contentId } = req.body;

    logger.info('Content added to library', { contentId });

    res.status(201).json({
      success: true,
      data: { id: 'lib-' + Date.now(), contentId, addedAt: new Date() },
      timestamp: new Date(),
      requestId: 'req-001',
    });
  } catch (error) {
    logger.error('Failed to add to library', error as Error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR' } });
  }
});

/**
 * Get listening history
 */
app.get('/api/users/me/history', (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: [
        {
          id: 'progress-001',
          episodeId: 'episode-1',
          title: 'اپیزود ۱۲',
          currentPosition: 300000,
          totalDuration: 3600000,
          playedAt: new Date(),
          isCompleted: false,
        },
      ],
      pagination: {
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      timestamp: new Date(),
      requestId: 'req-001',
    });
  } catch (error) {
    logger.error('Failed to get history', error as Error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR' } });
  }
});

/**
 * Follow user
 */
app.post('/api/users/:userId/follow', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    logger.info('User followed', { userId });

    res.status(201).json({
      success: true,
      data: { id: 'follow-' + Date.now(), userId, followingAt: new Date() },
      timestamp: new Date(),
      requestId: 'req-001',
    });
  } catch (error) {
    logger.error('Failed to follow user', error as Error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR' } });
  }
});

/**
 * Get following list
 */
app.get('/api/users/me/following', (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: [
        {
          id: 'user-456',
          username: 'creator_ali',
          avatarUrl: 'https://...',
          isCreator: true,
          followingAt: new Date(),
        },
      ],
      pagination: {
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      timestamp: new Date(),
      requestId: 'req-001',
    });
  } catch (error) {
    logger.error('Failed to get following list', error as Error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR' } });
  }
});

app.listen(port, () => {
  logger.info(`User Service running on port ${port}`);
});

export default app;

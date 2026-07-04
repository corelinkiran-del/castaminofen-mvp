// Content Service - Main entry point and endpoints

import express, { Express, Request, Response } from 'express';
import { createLogger, loadEnvConfig } from '@media-platform/shared';

const logger = createLogger('ContentService');
const config = loadEnvConfig();
const app: Express = express();
const port = process.env.PORT || 3003;

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'content-service', timestamp: new Date() });
});

/**
 * Search contents
 */
app.get('/api/contents/search', (req: Request, res: Response) => {
  try {
    const { q, type = 'podcast', page = 1, limit = 20 } = req.query;

    logger.info('Content search', { q, type });

    res.json({
      success: true,
      data: [
        {
          id: 'content-1',
          title: 'پادکست علمی',
          creator: { id: 'creator-1', name: 'محمد', avatarUrl: '' },
          coverImageUrl: '',
          category: 'education',
          totalEpisodes: 50,
          totalFollowers: 5000,
          explicit: false,
          requiresSubscription: false,
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
    logger.error('Search failed', error as Error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR' } });
  }
});

/**
 * Get content details
 */
app.get('/api/contents/:contentId', (req: Request, res: Response) => {
  try {
    const { contentId } = req.params;

    res.json({
      success: true,
      data: {
        id: contentId,
        title: 'پادکست علمی',
        description: 'توضیح کامل',
        coverImageUrl: '',
        type: 'podcast',
        category: 'education',
        creator: { id: 'creator-1', name: 'محمد' },
        totalEpisodes: 50,
        totalPlays: 500000,
        totalFollowers: 5000,
        explicit: false,
        isSaved: false,
      },
      timestamp: new Date(),
      requestId: 'req-001',
    });
  } catch (error) {
    logger.error('Failed to get content', error as Error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR' } });
  }
});

/**
 * Get episodes for content
 */
app.get('/api/contents/:contentId/episodes', (req: Request, res: Response) => {
  try {
    const { contentId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    res.json({
      success: true,
      data: [
        {
          id: 'episode-1',
          contentId,
          episodeNumber: '001',
          title: 'مقدمه',
          description: 'توضیح اپیزود',
          duration: 3600,
          publishedAt: new Date(),
          explicit: false,
        },
      ],
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: 50,
        totalPages: 3,
        hasNextPage: true,
        hasPreviousPage: false,
      },
      timestamp: new Date(),
      requestId: 'req-001',
    });
  } catch (error) {
    logger.error('Failed to get episodes', error as Error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR' } });
  }
});

/**
 * Get episode details
 */
app.get('/api/contents/:contentId/episodes/:episodeId', (req: Request, res: Response) => {
  try {
    const { contentId, episodeId } = req.params;

    res.json({
      success: true,
      data: {
        id: episodeId,
        contentId,
        title: 'مقدمه',
        description: 'توضیح کامل',
        duration: 3600000,
        fileUrl: 'https://media-cdn.ir/...',
        publishedAt: new Date(),
        creator: { id: 'creator-1', name: 'محمد' },
        content: { id: contentId, title: 'نام پادکست' },
        userProgress: {
          currentPosition: 300000,
          playbackSpeed: 1,
          isCompleted: false,
        },
      },
      timestamp: new Date(),
      requestId: 'req-001',
    });
  } catch (error) {
    logger.error('Failed to get episode', error as Error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR' } });
  }
});

/**
 * Get explore/discover page
 */
app.get('/api/contents/explore', (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: {
        trending: [{ id: 'content-1', title: 'محتوای محبوب' }],
        featured: [{ id: 'content-2', title: 'محتوای برجسته' }],
        recommended: [{ id: 'content-3', title: 'توصیه شده' }],
        newReleases: [{ id: 'content-4', title: 'آخرین' }],
        categories: [
          { name: 'education', label: 'آموزش' },
          { name: 'entertainment', label: 'سرگرمی' },
        ],
      },
      timestamp: new Date(),
      requestId: 'req-001',
    });
  } catch (error) {
    logger.error('Failed to get explore', error as Error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR' } });
  }
});

app.listen(port, () => {
  logger.info(`Content Service running on port ${port}`);
});

export default app;

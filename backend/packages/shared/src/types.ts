// Common types and interfaces for all services

export interface IUser {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  bio?: string;
  subscriptionStatus: 'free' | 'premium' | 'creator' | 'admin';
  isCreator: boolean;
  darkMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContent {
  id: string;
  creatorId: string;
  title: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  type: 'podcast' | 'audiobook' | 'video';
  category: string;
  language: string;
  explicit: boolean;
  requiresSubscription: boolean;
  totalEpisodes: number;
  totalDuration: number;
  totalPlays: number;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEpisode {
  id: string;
  contentId: string;
  episodeNumber: string;
  seasonNumber?: string;
  title: string;
  description: string;
  fileUrl: string;
  fileSize: number;
  fileDuration: number;
  thumbnailUrl?: string;
  transcriptUrl?: string;
  explicit: boolean;
  publishedAt: Date;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserProgress {
  id: string;
  userId: string;
  episodeId: string;
  currentPosition: number;
  totalDuration: number;
  playbackSpeed: number;
  isCompleted: boolean;
  playedAt: Date;
  updatedAt: Date;
}

export interface IPlaylist {
  id: string;
  userId: string;
  title: string;
  description?: string;
  isPublic: boolean;
  totalEpisodes: number;
  totalDuration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreator {
  id: string;
  userId: string;
  displayName: string;
  description: string;
  profileImageUrl?: string;
  verified: boolean;
  totalFollowers: number;
  totalContent: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubscription {
  id: string;
  userId: string;
  type: 'monthly' | 'yearly';
  amount: number;
  currency: string;
  status: 'active' | 'expired' | 'cancelled';
  startDate: Date;
  expiresAt: Date;
  autoRenew: boolean;
  createdAt: Date;
}

export interface IStreamResponse {
  manifestUrl: string;
  format: 'hls' | 'dash';
  quality: string;
  duration: number;
  availableBitrates: number[];
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: IApiError;
  timestamp: Date;
  requestId: string;
}

export interface IApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface IPaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface IJwtPayload {
  sub: string; // user id
  email: string;
  username: string;
  subscriptionStatus: string;
  isCreator: boolean;
  iat: number;
  exp: number;
}

export interface IOAuth2Profile {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'google' | 'apple';
}

export class ApiException extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 400,
    public details?: Record<string, any>,
  ) {
    super(message);
    this.name = 'ApiException';
  }
}

export const ERROR_CODES = {
  INVALID_REQUEST: 'INVALID_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const;

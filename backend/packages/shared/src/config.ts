// Shared configuration utilities

export interface IEnvConfig {
  nodeEnv: 'development' | 'staging' | 'production';
  logLevel: string;
  port: number;
  
  // Database
  databaseUrl: string;
  
  // Cache
  redisUrl: string;
  
  // JWT
  jwtSecret: string;
  jwtExpiration: number;
  
  // OAuth
  googleClientId?: string;
  googleClientSecret?: string;
  appleClientId?: string;
  appleClientSecret?: string;
  
  // Storage
  minioEndpoint: string;
  minioAccessKey: string;
  minioSecretKey: string;
  minioBucket: string;
  
  // RabbitMQ
  rabbitmqUrl: string;
  
  // Service URLs
  authServiceUrl: string;
  userServiceUrl: string;
  contentServiceUrl: string;
  mediaServiceUrl: string;
  paymentServiceUrl: string;
  
  // Email
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  
  // Payments
  paymentGatewayKey: string;
  paymentGatewaySecret: string;
  
  // App
  appName: string;
  appVersion: string;
}

export function loadEnvConfig(): IEnvConfig {
  return {
    nodeEnv: (process.env.NODE_ENV as any) || 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
    port: parseInt(process.env.PORT || '3000', 10),
    
    databaseUrl: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/media_platform',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    
    jwtSecret: process.env.JWT_SECRET || 'secret-key',
    jwtExpiration: parseInt(process.env.JWT_EXPIRATION || '3600', 10),
    
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    appleClientId: process.env.APPLE_CLIENT_ID,
    appleClientSecret: process.env.APPLE_CLIENT_SECRET,
    
    minioEndpoint: process.env.MINIO_ENDPOINT || 'http://localhost:9000',
    minioAccessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    minioSecretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    minioBucket: process.env.MINIO_BUCKET || 'media-platform',
    
    rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    
    authServiceUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    userServiceUrl: process.env.USER_SERVICE_URL || 'http://localhost:3002',
    contentServiceUrl: process.env.CONTENT_SERVICE_URL || 'http://localhost:3003',
    mediaServiceUrl: process.env.MEDIA_SERVICE_URL || 'http://localhost:3004',
    paymentServiceUrl: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3005',
    
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtpPort: parseInt(process.env.SMTP_PORT || '587', 10),
    smtpUser: process.env.SMTP_USER || '',
    smtpPassword: process.env.SMTP_PASSWORD || '',
    
    paymentGatewayKey: process.env.PAYMENT_GATEWAY_API_KEY || '',
    paymentGatewaySecret: process.env.PAYMENT_GATEWAY_SECRET || '',
    
    appName: 'Media Platform',
    appVersion: '1.0.0',
  };
}

// Logger utility for consistent logging across all services

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export interface ILogContext {
  requestId?: string;
  userId?: string;
  service?: string;
  [key: string]: any;
}

export class Logger {
  constructor(
    private context: string,
    private minLevel: LogLevel = LogLevel.INFO,
  ) {}

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: ILogContext,
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level}] [${this.context}]${contextStr} ${message}`;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.minLevel);
  }

  debug(message: string, context?: ILogContext): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, context));
    }
  }

  info(message: string, context?: ILogContext): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatMessage(LogLevel.INFO, message, context));
    }
  }

  warn(message: string, context?: ILogContext): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(LogLevel.WARN, message, context));
    }
  }

  error(message: string, error?: Error, context?: ILogContext): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      const errorContext = {
        ...context,
        stack: error?.stack,
        message: error?.message,
      };
      console.error(this.formatMessage(LogLevel.ERROR, message, errorContext));
    }
  }
}

export function createLogger(context: string): Logger {
  const minLevel = (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO;
  return new Logger(context, minLevel);
}

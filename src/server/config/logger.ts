// Simple logger implementation for client-side
type LogLevel = 'info' | 'error' | 'warn' | 'debug';

class Logger {
  private getTimestamp() {
    return new Date().toISOString();
  }

  private log(level: LogLevel, message: string, ...meta: any[]) {
    const timestamp = this.getTimestamp();
    const metaString = meta.length ? JSON.stringify(meta, null, 2) : '';
    
    // In development, log to console
    if (import.meta.env.DEV) {
      console[level](`[${timestamp}] [${level.toUpperCase()}]: ${message}`, metaString);
    }
    
    // In production, you might want to send logs to a service
    if (import.meta.env.PROD) {
      // Implement production logging here
      // For example, send to a logging service
    }
  }

  info(message: string, ...meta: any[]) {
    this.log('info', message, ...meta);
  }

  error(message: string, ...meta: any[]) {
    this.log('error', message, ...meta);
  }

  warn(message: string, ...meta: any[]) {
    this.log('warn', message, ...meta);
  }

  debug(message: string, ...meta: any[]) {
    if (import.meta.env.DEV) {
      this.log('debug', message, ...meta);
    }
  }
}

export const logger = new Logger();

// Add request logging middleware
export const requestLogger = (req: any, res: any, next: any) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userId: req.user?._id
  });
  next();
};
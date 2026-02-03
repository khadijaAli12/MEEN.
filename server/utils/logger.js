// Enhanced logger for production
import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

// Define custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Create logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    colorize(),
    logFormat
  ),
  transports: [
    // Log to file in production
    ...(process.env.NODE_ENV === 'production' 
      ? [
          new winston.transports.File({ 
            filename: 'logs/error.log', 
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5
          }),
          new winston.transports.File({ 
            filename: 'logs/combined.log', 
            maxsize: 5242880, // 5MB
            maxFiles: 5
          })
        ] 
      : []
    ),
    // Always log to console in development
    new winston.transports.Console({
      format: combine(
        colorize(),
        logFormat
      )
    })
  ],
  exceptionHandlers: [
    ...(process.env.NODE_ENV === 'production'
      ? [new winston.transports.File({ filename: 'logs/exceptions.log' })]
      : [new winston.transports.Console()]
    )
  ],
  rejectionHandlers: [
    ...(process.env.NODE_ENV === 'production'
      ? [new winston.transports.File({ filename: 'logs/rejections.log' })]
      : [new winston.transports.Console()]
    )
  ]
});

export default logger;
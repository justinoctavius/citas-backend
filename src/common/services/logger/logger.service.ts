import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import { getNamespace } from 'cls-hooked';

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  const session = getNamespace('books-reader');
  const traceId = session.get('traceId');

  return JSON.stringify({ timestamp, traceId, level, message });
});

@Injectable()
export class Logger implements LoggerService {
  private logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), myFormat),
    transports: [new transports.Console()],
  });

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}

import { createWriteStream, mkdirSync, existsSync } from 'node:fs';

import { createLogger, format, transports } from 'winston';

if (!existsSync('./logs')) {
  mkdirSync('./logs');
}
const writableStream = createWriteStream('./logs/output.log', { flags: 'a' });

const stdLogFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => {
    return `[${timestamp as string}] [${level.toUpperCase()}]: ${message as string}`;
  }),
);

export const logger = createLogger({
  level: 'info',
  format: stdLogFormat,
  transports: [
    new transports.Stream({ stream: process.stdout }),
    new transports.Stream({ stream: writableStream }),
  ],
});

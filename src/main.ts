import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CustomLogger } from './logger/logger.service';
import { LogLevel } from '@nestjs/common';

dotenv.config();

const PORT = process.env.PORT ?? 4000;
const LOG_LEVEL = process.env.PORT ?? 5;
const logLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logLevels.slice(0, +LOG_LEVEL),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  //app.useLogger(app.get(CustomLogger));
  app.useLogger(new CustomLogger());
  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}

bootstrap();

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { url, params, body } = req;

    res.on('close', () => {
      console.log(
        `Request ${url}, ${JSON.stringify(params)} ${JSON.stringify(body)}`,
      );
      const { statusCode } = res;
      console.log(`Response ${statusCode}`);
    });

    next();
  }
}

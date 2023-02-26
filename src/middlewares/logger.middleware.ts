import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('URL: ' + req.url);
    console.log('Params: ' + req.params.toString());
    console.log('Body: ' + req.body.toString());
    console.log('Response code: ' + res.statusCode);
    next();
  }
}

import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {
  /**
 * Write a 'log' level log.
 */
  log(message: any, ...optionalParams: any[]) {}

  /**
  * Write an 'error' level log.
  */
  error(message: any, ...optionalParams: any[]) {}

  /**
  * Write a 'warn' level log.
  */
  warn(message: any, ...optionalParams: any[]) {}

  /**
  * Write a 'debug' level log.
  */
  debug(message: any, ...optionalParams: any[]) {}

  /**
  * Write a 'verbose' level log.
  */
  verbose(message: any, ...optionalParams: any[]) {}
}

import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {
  private logName = 'logfile.log';
  private logOptions = { flag: 'a' };

  async writeLog(level, message) {
    const text = new Date() + ' ' + level + ': ' + message + '\n';
    await writeFile(this.logName, text, this.logOptions);
  }

  async log(message: string) {
    await this.writeLog('LOG', message);
  }

  async error(message: string) {
    await this.writeLog('ERROR', message);
  }

  async warn(message: string) {
    await this.writeLog('WARN', message);
  }

  async debug(message: string) {
    await this.writeLog('DEBUG', message);
  }

  async verbose(message: string) {
    await this.writeLog('VERBOSE', message);
  }
}

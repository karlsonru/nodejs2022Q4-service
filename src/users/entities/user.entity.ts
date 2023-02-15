import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';

export class User {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  @Exclude({ toPlainOnly: true })
  password: string;

  constructor({ login, password }) {
    this.login = login;
    this.password = password;

    this.id = randomUUID();
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}

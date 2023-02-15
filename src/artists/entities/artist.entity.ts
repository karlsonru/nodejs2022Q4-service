import { randomUUID } from 'node:crypto';

export class Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor({ name, grammy }) {
    this.id = randomUUID();
    this.name = name;
    this.grammy = grammy;
  }
}

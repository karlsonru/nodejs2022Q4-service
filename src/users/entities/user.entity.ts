import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  version: number; // integer number, increments on update

  @Column()
  createdAt: number; // timestamp of creation

  @Column()
  updatedAt: number; // timestamp of last update

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  constructor() {
    this.id = randomUUID();
    this.version = 1;
    this.createdAt = (+Date.now() / 1000) | 0;
    this.updatedAt = (+Date.now() / 1000) | 0;
  }
}

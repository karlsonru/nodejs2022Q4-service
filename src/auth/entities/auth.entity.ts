import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @CreateDateColumn({
    type: 'timestamp',
    default: new Date(),
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return Date.parse(value);
      },
    },
  })
  createdAt: Date; // timestamp of creation

  @UpdateDateColumn({
    type: 'timestamp',
    default: new Date(),
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return Date.parse(value);
      },
    },
  })
  updatedAt: Date; // timestamp of last update

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
}

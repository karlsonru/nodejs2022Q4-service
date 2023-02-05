import { database } from '../database/database';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly db = database;

  async create(createUserDto: CreateUserDto) {
    const newUser = new User(createUserDto);
    await this.db.users.push(newUser);
    return newUser;
  }

  async findAll() {
    return await this.db.users;
  }

  async findOne(id: string) {
    const user = await this.db.users.find((user) => user.id === id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.db.users.find((user) => user.id === id);

    if (!user) return null;

    if (user.password !== updateUserDto.oldPassword) {
      return false;
    }

    user.password = updateUserDto.password;
    user.version += 1;
    user.updatedAt = Date.now();

    return user;
  }

  async remove(id: string) {
    const idx = await this.db.users.findIndex((user) => user.id === id);

    if (idx === -1) return null;

    return await this.db.users.splice(idx, 1);
  }
}

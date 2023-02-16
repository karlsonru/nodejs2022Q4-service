import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.login = createUserDto.login;
    newUser.password = createUserDto.password;
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findAll() {
    return await this.usersRepository.find({});
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) return null;

    if (user.password !== updateUserDto.oldPassword) {
      return false;
    }

    user.password = updateUserDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return user;
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
  }
}

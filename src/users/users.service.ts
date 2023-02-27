import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(+this.configService.get('CRYPT_SALT'));
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const newUser = this.usersRepository.create({
      login: createUserDto.login,
      password: hash,
    });

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

  async findOneBy(obj: { [key: string]: string | number }) {
    const user = await this.usersRepository.findOneBy(obj);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) return null;

    const isSamePassword = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!isSamePassword) {
      return false;
    }

    const salt = await bcrypt.genSalt(+this.configService.get('CRYPT_SALT'));
    const hash = await bcrypt.hash(updateUserDto.newPassword, salt);

    await this.usersRepository.update(id, {
      password: hash,
      updatedAt: new Date(),
    });

    const updatedUser = await this.usersRepository.findOneBy({ id });

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) return null;

    return await this.usersRepository.delete(id);
  }
}

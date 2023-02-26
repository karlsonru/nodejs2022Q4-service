import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-auth.dto';
import { User } from './entities/auth.entity';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async create(createAuthDto: CreateUserDto) {
    const hash = await bcrypt.hash(
      createAuthDto.password,
      this.configService.get('CRYPT_SALT'),
    );

    const newUser = this.usersRepository.create({
      login: createAuthDto.login,
      password: hash,
    });

    await this.usersRepository.save(newUser);
    return newUser;
  }
}

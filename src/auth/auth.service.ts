import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneBy({ login: login });

    if (!user) return null;

    const isSamePassword = await bcrypt.compare(pass, user.password);

    if (isSamePassword) {
      return user;
    }

    return null;
  }

  async signup(createAuthDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(+this.configService.get('CRYPT_SALT'));
    const hash = await bcrypt.hash(createAuthDto.password, salt);

    const newUser = await this.usersService.create({
      login: createAuthDto.login,
      password: hash,
    });

    return { id: newUser.id };
  }

  async login(createAuthDto: CreateUserDto) {
    const user = await this.usersService.findOneBy({
      login: createAuthDto.login,
    });

    if (!user) {
      return { accessToken: null };
    }

    const payload = { login: user.login, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

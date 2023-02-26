import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() createAuthDto: CreateUserDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post('/login')
  login(@Body() createAuthDto: CreateUserDto) {
    console.log('login under guards');
    return this.authService.login(createAuthDto);
  }

  @Post('/refresh')
  refresh(@Body() createAuthDto: CreateUserDto) {
    return this.authService.signup(createAuthDto);
  }
}

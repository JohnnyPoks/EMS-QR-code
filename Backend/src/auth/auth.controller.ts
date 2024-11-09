import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.authService.login(user);
  }

  @Post('registerAdmin')
  async registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    try {
      const result = await this.authService.registerAdmin(registerAdminDto);
      return {
        message: 'Registered successfully',
        info: result,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const result = await this.authService.registerUser(registerDto);
      return {
        message: 'Registered successfully',
        info: result,
      };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          'Admin with given id not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}

import {
  Controller,
  Get,
  Query,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('userList')
  async getUserList(
    @Query('admin') adminId: number,
    @Query('page') page = 1,
    @Query('per_page') per_page = 20,
  ) {
    const result = await this.usersService.findByAdmin(adminId, page, per_page);
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async deleteUser(
    @Query('userId') userId: number,
    @Query('adminId') adminId: number,
  ) {
    const user = await this.usersService.deleteUser(userId, adminId);
    return {
      message: 'Deleted successfully',
      user: user.name,
    };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByAdmin(adminId: number, page = 1, limit = 20) {
    const [users, total] = await this.userRepository.findAndCount({
      where: { admin_ref: adminId, archived: false },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      users,
      page,
      per_page: limit,
      total_pages: Math.ceil(total / limit),
      total_items: total,
    };
  }

  async deleteUser(userId: number, adminId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId, admin_ref: adminId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
    return user;
  }
}

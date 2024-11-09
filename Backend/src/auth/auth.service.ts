import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Administrator } from '../entities/administrator.entity';
import { User } from '../entities/user.entity';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Administrator)
    private adminRepository: Repository<Administrator>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // Find user in users table
    const user = await this.userRepository.findOne({
      where: { name: username, archived: false },
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return { ...result, isAdmin: false };
    }

    // Find admin in administrator table
    const admin = await this.adminRepository.findOne({
      where: { name: username, archived: false },
    });
    if (admin && (await bcrypt.compare(pass, admin.password))) {
      const { password, ...result } = admin;
      return { ...result, isAdmin: true };
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.name,
      sub: user.id,
      isAdmin: user.isAdmin,
    };
    return {
      username: user.name.toUpperCase(),
      response: true,
      token: this.jwtService.sign(payload),
      message: 'Logged in successfully',
      isAdmin: user.isAdmin,
      admin_id: user.isAdmin ? user.id : undefined,
    };
  }

  async registerAdmin(data: RegisterAdminDto) {
    const { actual_name, password, telephone } = data;
    const existingAdmin = await this.adminRepository.findOne({
      where: { actual_name, archived: false },
    });
    if (existingAdmin) {
      throw new UnauthorizedException('Admin already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const username = await this.generateAdminUsername(actual_name);

    const admin = this.adminRepository.create({
      name: username,
      password: hashedPassword,
      telephone,
      actual_name,
      created_at: new Date(),
    });

    await this.adminRepository.save(admin);
    return {
      id: admin.id,
      username: admin.name,
    };
  }

  private async generateAdminUsername(actual_name: string): Promise<string> {
    let username = '';
    const names = actual_name.split(' ');
    if (names.length === 1) {
      username = names[0].substring(0, 4).toUpperCase().padEnd(4, '$');
    } else {
      for (const name of names) {
        username += name.substring(0, 2).toUpperCase();
        if (username.length >= 4) break;
      }
    }

    const existingAdmins = await this.adminRepository.find({
      where: { name: Like(`${username}%`) },
      order: { name: 'DESC' },
    });

    if (existingAdmins.length > 0) {
      const lastAdmin = existingAdmins[0];
      const lastNumber = parseInt(lastAdmin.name.substring(4), 10) || 0;
      username += (lastNumber + 1).toString();
    }

    return username;
  }

  async registerUser(data: RegisterDto) {
    const { actual_name, telephone, admin_id } = data;

    const admin = await this.adminRepository.findOne({
      where: { id: admin_id },
    });
    if (!admin) {
      throw new UnauthorizedException('Admin with given id not found');
    }

    const existingUser = await this.userRepository.findOne({
      where: { actual_name, admin_ref: admin_id },
    });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const username = await this.generateUsername(admin.name);
    const hashedPassword = await bcrypt.hash(username, 10);

    const user = this.userRepository.create({
      name: username,
      password: hashedPassword,
      telephone,
      actual_name,
      admin_ref: admin_id,
    });

    await this.userRepository.save(user);

    return {
      id: user.id,
      username: user.name,
      password: username,
    };
  }

  private async generateUsername(adminName: string): Promise<string> {
    const existingUsers = await this.userRepository.find({
      where: { name: Like(`${adminName}_%`) },
      order: { name: 'DESC' },
    });

    let nextNumber = 1;
    if (existingUsers.length > 0) {
      const lastUser = existingUsers[0];
      const parts = lastUser.name.split('_');
      if (parts.length === 2) {
        nextNumber = parseInt(parts[1], 10) + 1;
      }
    }

    return `${adminName}_${nextNumber.toString().padStart(3, '0')}`;
  }
}

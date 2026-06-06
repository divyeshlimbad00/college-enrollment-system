import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from '../admin/admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { AdminDocument } from '../admin/schemas/admin.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateAdmin(username: string, password: string): Promise<AdminDocument> {
    const admin = await this.adminService.findOneByUsername(username);
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, admin.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return admin;
  }

  async login(loginDto: LoginAdminDto) {
    const admin = await this.validateAdmin(loginDto.username, loginDto.password);
    const payload = { username: admin.username, sub: admin._id.toString() };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

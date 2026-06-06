import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AdminService } from '../admin/admin.service';
import { AdminDocument } from '../admin/schemas/admin.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ?? 'changeThisSecret',
    });
  }

  async validate(payload: { sub: string; username: string }): Promise<{ userId: string; username: string }> {
    const admin: AdminDocument | null = await this.adminService.findById(payload.sub);
    if (!admin) {
      throw new UnauthorizedException('Administrator not found');
    }

    return {
      userId: admin._id.toString(),
      username: admin.username,
    };
  }
}

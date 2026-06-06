import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new admin user' })
  @ApiResponse({ status: 201, description: 'Admin created successfully' })
  async register(@Body() payload: CreateAdminDto) {
    const admin = await this.adminService.create(payload);
    return {
      id: admin._id,
      username: admin.username,
      createdAt: admin.createdAt,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List admin users' })
  @ApiResponse({ status: 200, description: 'List of admins' })
  async findAll() {
    return this.adminService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current admin profile' })
  @ApiResponse({ status: 200, description: 'Current admin profile' })
  async current(@Request() req: { user: { userId: string; username: string } }) {
    return {
      id: req.user.userId,
      username: req.user.username,
    };
  }
}

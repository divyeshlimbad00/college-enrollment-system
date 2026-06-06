import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Enrollments')
@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enroll a student in a course' })
  @ApiResponse({ status: 201, description: 'Student enrolled successfully' })
  async enroll(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.enroll(createEnrollmentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all enrollments' })
  @ApiResponse({ status: 200, description: 'List of enrollments' })
  async findAll() {
    return this.enrollmentService.findAll();
  }
}

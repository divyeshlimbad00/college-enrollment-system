import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@ApiTags('Students')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new student' })
  @ApiResponse({ status: 201, description: 'Student registered successfully' })
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all registered students' })
  @ApiResponse({ status: 200, description: 'A list of students' })
  async findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a student by id' })
  @ApiResponse({ status: 200, description: 'Student data' })
  async findById(@Param('id') id: string) {
    return this.studentService.findById(id);
  }
}

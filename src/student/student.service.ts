import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentDocument> {
    const existing = await this.studentModel.exists({ email: createStudentDto.email });
    if (existing) {
      throw new ConflictException('Email already used by another student');
    }

    const student = new this.studentModel({
      firstName: createStudentDto.firstName,
      lastName: createStudentDto.lastName,
      email: createStudentDto.email,
      major: createStudentDto.major,
    });

    return student.save();
  }

  async findAll(): Promise<StudentDocument[]> {
    return this.studentModel.find().exec();
  }

  async findById(id: string): Promise<StudentDocument> {
    const student = await this.studentModel.findById(id).exec();
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }
}

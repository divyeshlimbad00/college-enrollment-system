import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<CourseDocument> {
    const duplicate = await this.courseModel.exists({ title: createCourseDto.title });
    if (duplicate) {
      throw new ConflictException('A course with this title already exists');
    }

    const course = new this.courseModel({
      title: createCourseDto.title,
      description: createCourseDto.description,
      capacity: createCourseDto.capacity,
    });

    return course.save();
  }

  async findAll(): Promise<CourseDocument[]> {
    return this.courseModel.find().exec();
  }

  async findById(id: string): Promise<CourseDocument> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async tryIncrementEnrollment(id: string): Promise<CourseDocument | null> {
    const updated = await this.courseModel
      .findOneAndUpdate(
        {
          _id: id,
          $expr: { $lt: ['$enrolledCount', '$capacity'] },
        },
        { $inc: { enrolledCount: 1 } },
        { new: true },
      )
      .exec();

    return updated;
  }
}

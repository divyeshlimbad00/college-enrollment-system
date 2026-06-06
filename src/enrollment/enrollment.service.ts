import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './schemas/enrollment.schema';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { CourseService } from '../course/course.service';
import { StudentService } from '../student/student.service';
import { CourseDocument } from '../course/schemas/course.schema';
import { StudentDocument } from '../student/schemas/student.schema';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<EnrollmentDocument>,
    private readonly courseService: CourseService,
    private readonly studentService: StudentService,
  ) {}

  async enroll(createEnrollmentDto: CreateEnrollmentDto): Promise<EnrollmentDocument> {
    const student: StudentDocument = await this.studentService.findById(createEnrollmentDto.studentId);
    const course: CourseDocument = await this.courseService.findById(createEnrollmentDto.courseId);

    const alreadyEnrolled = await this.enrollmentModel.exists({
      student: student._id,
      course: course._id,
    });
    if (alreadyEnrolled) {
      throw new BadRequestException('Student is already enrolled in this course');
    }

    const updatedCourse = await this.courseService.tryIncrementEnrollment(course._id.toString());
    if (!updatedCourse) {
      throw new BadRequestException('Course capacity has been reached');
    }

    const enrollment = new this.enrollmentModel({
      student: student._id,
      course: course._id,
    });

    return enrollment.save();
  }

  async findAll(): Promise<EnrollmentDocument[]> {
    return this.enrollmentModel
      .find()
      .populate('student')
      .populate('course')
      .exec();
  }
}

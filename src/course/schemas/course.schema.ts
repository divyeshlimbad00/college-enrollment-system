import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, unique: true, trim: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true, min: 1 })
  capacity: number;

  @Prop({ default: 0 })
  enrolledCount: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

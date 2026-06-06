import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'Calculus I' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Introduction to differential calculus', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Min(1)
  capacity: number;
}

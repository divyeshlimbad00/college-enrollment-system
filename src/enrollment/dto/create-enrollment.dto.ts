import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ example: '649f6b4b8f1edb26e4ed1a6f' })
  @IsMongoId()
  @IsNotEmpty()
  studentId!: string;

  @ApiProperty({ example: '649f6b7d8f1edb26e4ed1a70' })
  @IsMongoId()
  @IsNotEmpty()
  courseId!: string;
}

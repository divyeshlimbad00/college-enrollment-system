import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<AdminDocument> {
    const existing = await this.adminModel.exists({ username: createAdminDto.username });
    if (existing) {
      throw new ConflictException('Username is already in use');
    }

    const password = await bcrypt.hash(createAdminDto.password, 10);
    const admin = new this.adminModel({
      username: createAdminDto.username,
      password,
    });

    return admin.save();
  }

  async findOneByUsername(username: string): Promise<AdminDocument | null> {
    return this.adminModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<AdminDocument | null> {
    return this.adminModel.findById(id).exec();
  }

  async findAll(): Promise<AdminDocument[]> {
    return this.adminModel.find().select('-password').exec();
  }
}

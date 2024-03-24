import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createIfNotExists({ email, ...rest }: CreateUserDto): Promise<User> {
    const userFounded = await this.findByEmail({
      email,
    });

    if (userFounded) {
      return userFounded;
    }

    const newUser = this.usersRepository.create({
      ...rest,
      email,
      id: uuid.v4(),
    });
    await this.usersRepository.save(newUser);

    return newUser;
  }

  async findByEmail({ email }: { email: string }): Promise<User> {
    return this.usersRepository.findOne({
      where: [{ email }],
      select: ['id', 'email'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}

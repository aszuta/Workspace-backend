import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signIn(userDto: UserDto): Promise<void> {
    const salt = await bcrypt.genSalt(16);
    const hash = await bcrypt.hash(userDto.password, salt);

    const data = {
      name: userDto.name,
      email: userDto.email,
      password: hash,
    };

    await this.userRepository.create(data);
  }

  findOne(email: string): Promise<User> {
    return this.userRepository.findOne(email);
  }
}

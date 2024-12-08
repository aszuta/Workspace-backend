import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.interface';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async signIn(userDto: UserDto): Promise<void> {
    const salt = await bcrypt.genSalt(16);
    const hash = await bcrypt.hash(userDto.password, salt);

    const data = {
      name: userDto.name,
      email: userDto.email,
    };

    const user = await this.userRepository.create(data);
    await this.authService.createAuthCredentials(user[0], hash);
  }

  findOne(email: string): Promise<User> {
    return this.userRepository.findOne(email);
  }

  findOneById(id: number): Promise<Record<string, any>> {
    return this.userRepository.findById(id);
  }
}

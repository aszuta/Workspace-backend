import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RegisterService {
  constructor(private readonly userService: UserService) {}

  async registerUser(userDto: UserDto): Promise<void> {
    await this.userService.signIn(userDto);
  }
}

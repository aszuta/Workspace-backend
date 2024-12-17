import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { UserDto } from 'src/user/dto/create-user.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registereService: RegisterService) {}

  @Post()
  registerUser(@Body() userDto: UserDto): Promise<void> {
    return this.registereService.registerUser(userDto);
  }
}

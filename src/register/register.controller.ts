import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registereService: RegisterService) {}

  @Post()
  registerUser(@Body() userDto: UserDto): Promise<any> {
    return this.registereService.registerUser(userDto);
  }
}

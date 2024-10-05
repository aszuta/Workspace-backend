import { Body, Controller, Post, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserLoginDto } from 'src/user/dto/user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const data = await this.authService.login(userLoginDto);
    console.log(data);
    console.log(userLoginDto);
    res.cookie('authcookie', data.accessToken, {
      expires: new Date(Date.now() + 5 * 60 * 1000),
    });
    res.cookie('refreshToken', data.accessToken, {
      httpOnly: true,
    });
  }
}

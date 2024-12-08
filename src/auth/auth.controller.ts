import {
  Body,
  Controller,
  Post,
  UseGuards,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserLoginDto } from 'src/user/dto/user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const data = await this.authService.login(userLoginDto);
    res.cookie('authcookie', data.accessToken, {
      expires: new Date(Date.now() + 5 * 60 * 1000),
    });
    res.cookie('refreshtoken', data.refreshToken, {
      httpOnly: true,
    });
  }

  @Get('refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) res): Promise<void> {
    const cookie = req.cookies['refreshtoken'];
    const user = await this.authService.findByRefreshToken(cookie);
    const accessToken = this.authService.setAccessToken(user.id);
    const refreshToken = await this.authService.setRefreshToken(user.id);
    res.cookie('authcookie', accessToken, {
      expires: new Date(Date.now() + 5 * 60 * 1000),
    });
    res.cookie('refreshtoken', refreshToken, {
      httpOnly: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req, @Res({ passthrough: true }) res): Promise<void> {
    await this.authService.logout(req.user.id);
    res.clearCookie('authcookie');
    res.clearCookie('refreshtoken');
  }
}

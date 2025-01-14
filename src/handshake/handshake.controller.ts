import {
  Controller,
  Get,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('handshake')
export class HandshakeController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCurrentUser(@Req() req): Promise<Record<string, any>> {
    const user = await this.userService.findOneById(req.user.id);
    if (!user) throw new NotFoundException();
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

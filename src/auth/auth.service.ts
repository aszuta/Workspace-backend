import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from 'src/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  async createAuthCredentials(id: number, password: string): Promise<void> {
    await this.authRepository.create(id, password);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const userPassword = await this.authRepository.findById(user.id);

    if (user && bcrypt.compare(userPassword.password, password)) {
      return user;
    }

    return null;
  }

  setAccessToken(id: number): string {
    return this.jwtService.sign({ sub: id });
  }

  async setRefreshToken(id: number): Promise<string> {
    const refreshToken = randomBytes(64).toString('hex');
    await this.authRepository.setRefreshToken(refreshToken, id);
    return refreshToken;
  }

  async login(userLoginDto: UserLoginDto): Promise<Record<string, any>> {
    const user = await this.userService.findOne(userLoginDto.email);
    const accessToken = this.setAccessToken(user.id);
    const refreshToken = await this.setRefreshToken(user.id);
    return {
      accessToken,
      refreshToken,
    };
  }

  async findByRefreshToken(hash: string): Promise<Record<string, any>> {
    return await this.authRepository.findByRefreshToken(hash);
  }

  async logout(id: number): Promise<void> {
    await this.authRepository.removeRefreshToken(id);
  }
}

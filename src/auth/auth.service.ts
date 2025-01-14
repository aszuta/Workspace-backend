import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { randomBytes } from 'crypto';
import { Auth } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  async createAuthCredentials(auth: Auth): Promise<void> {
    await this.authRepository.create(auth);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user)
      throw new UnauthorizedException(
        'Użytkownik z podanym e-mailem nie istnieje.',
      );

    const userPassword = await this.authRepository.findById(user.id);
    const isValid = await bcrypt.compare(password, userPassword.password);
    if (!isValid)
      throw new UnauthorizedException('Niepoprawny adres e-mail lub hasło.');

    return user;
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

  async findByRefreshToken(hash: string): Promise<Auth> {
    return await this.authRepository.findByRefreshToken(hash);
  }

  async logout(id: number): Promise<void> {
    await this.authRepository.removeRefreshToken(id);
  }
}

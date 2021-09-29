import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

class LoginDTO {
  @ApiProperty({
    description:
      'Username (the one you setted up for this environment in the config.json)',
    default: 'admin',
  })
  username: string;
  @ApiProperty({
    description:
      'Password (the one you setted up for this environment in the config.json)',
    default: 'admin',
  })
  password: string;
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Bad credentials' })
  @ApiCreatedResponse({ description: 'Token created' })
  @Post('login')
  // loginDTO added for docummentation
  // eslint-disable-next-line
  async login(@Request() req, @Body() loginDTO: LoginDTO) {
    return this.authService.login(req.user);
  }
}

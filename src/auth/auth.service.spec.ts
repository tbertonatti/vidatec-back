import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { password, username } from '../helpers/config';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService],
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '2m' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('validateUser', () => {
    const badUsername = `${username}2`;
    const badPassword = `${password}2`;

    it('bad combination 1 should fail', async () => {
      const resValidation = await service.validateUser(username, badPassword);
      expect(resValidation).toBeNull();
    });

    it('bad combination 2 should fail', async () => {
      const resValidation = await service.validateUser(badUsername, password);
      expect(resValidation).toBeNull();
    });

    it('bad combination 3 should fail', async () => {
      const resValidation = await service.validateUser(
        badUsername,
        badPassword,
      );
      expect(resValidation).toBeNull();
    });

    it('good combination should work', async () => {
      const resValidation = await service.validateUser(username, password);
      expect(resValidation).toBeDefined();
      expect(resValidation).toMatchObject({ username });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { password, username } from '../helpers/config';
import { User, UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findOne', () => {
    const badUsername = `${username}2`;

    it("should'nt return any user", async () => {
      const resUser: User = await service.findOne(badUsername);
      expect(resUser).toBeUndefined();
    });
    it('should return the correct user', async () => {
      const resUser: User = await service.findOne(username);
      expect(resUser).toBeDefined();
      expect(resUser).toMatchObject({ username, password });
    });
  });
});

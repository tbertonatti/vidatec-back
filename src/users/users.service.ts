import { Injectable } from '@nestjs/common';
import { password, username } from '../helpers/config';

export type User = {
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      username,
      password,
    },
  ];

  async findOne(usern: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === usern);
  }
}

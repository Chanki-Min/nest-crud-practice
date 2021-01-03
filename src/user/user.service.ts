import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    private readonly users: User[] = [
        {
          username: 'john',
          passwordHash: 'changeme',
        },
        {
          username: 'maria',
          passwordHash: 'guess',
        },
      ];
    
      async getOneByUsername(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
      }
}

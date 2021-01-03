import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    private readonly users: User[] = [
        {
          username: 'john',
          emailAddress: 'john@gmail.com',
          passwordHash: 'changeme',
        },
        {
          username: 'maria',
          emailAddress: 'maria@gmail.com',
          passwordHash: 'guess',
        },
      ];
    
      async getOneByUsername(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
      }
}

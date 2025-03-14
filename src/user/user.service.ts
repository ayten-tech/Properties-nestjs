import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  createUser(createUserDto: CreateUserDto) {
    
    // Business logic to create a user
    return { message: 'User created successfully', data: createUserDto };
  }
}

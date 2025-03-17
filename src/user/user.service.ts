import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Injectable()
export class UserService {
   constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
      const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }
  

}

//  async create(createPropertyDto: CreatePropertyDto) {
//     const property = this.propertyRepository.create(createPropertyDto);
//     return await this.propertyRepository.save(property);
//   }

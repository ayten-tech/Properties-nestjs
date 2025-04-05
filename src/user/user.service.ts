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

  async updateRefreshToken(userId: number, hashedRefreshToken: string | null) {
    console.log("updateRefreshToken method in user service called")
  return await this.userRepository.update(userId, {hashedRefreshToken});
  }

  async create(createUserDto: CreateUserDto) {
      const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  // //GET Request specify id of property
  // async findOne(id: number) {
  //   return this.propertyRepository.findOneBy({ id });
  // }
  //GET Request specify id of property
  async findOne(id: number){
    return this.userRepository.findOne({ 
      where: { id },
      //returns specific columns instead of the whole entity, 
      // to return the whole entity just remove the following select clause
      select: ['id','firstName','lastName','email','hashedRefreshToken','role']
    });
  }

  //will retreive user based on email parameter(local strategy)
  async findByEmail(email: string){
    return await this.userRepository.findOne({ where: { email } });
  }

  remove(id: number) {
    //returns simple message for now
    return `This action removes a #${id} user`;
  }

}


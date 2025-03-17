import { Controller, Get, Param, NotFoundException,Body,Post,UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { ParseIdPipe } from '../property/pipes/parseIdPipe';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
//   @Get(':id')
//   getUser(@Param('id') id: string) {
//     const userId = parseInt(id, 10);
//     const user = this.userService.getUserById(userId);

//     if (!user) {
//       throw new NotFoundException('User not found');
      
//     }
//     return {
//       name: user.name,
//       email: user.email,
//     };
// }

//@Post handles POST requests , 
// @Body() decorator is used to extract the data coming in json of the request
//and put it in an object createUserDto and will automatically validate and transform the data 
//create user method indirectly calls validation pipe in main.ts through the use of body


@Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    // createUserDto is already validated and transformed
    return this.userService.create(createUserDto);
  }

  @Get(':id')
    getUser(@Param('id',ParseIdPipe) id: number) {
      console.log("inside controller parseidpipe ");
      return this.userService.findOne(id);
    }


}
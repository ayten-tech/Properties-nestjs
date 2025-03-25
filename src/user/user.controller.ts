import { Controller, Get, Param, NotFoundException,Body,Post,UsePipes, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { ParseIdPipe } from '../property/pipes/parseIdPipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { get } from 'http';


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

  //this was before the implementation of jwt authentication validating token part
  // @Get(':id')
  //   getUser(@Param('id',ParseIdPipe) id: number) {
  //     console.log("inside controller parseidpipe ");
  //     return this.userService.findOne(id);
  //   }

  
  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    console.log('inside profile user controller the return is ',req.user.id )
    return this.userService.findOne(req.user.id);// { id: "18" } this comes from validation method after attachement
  }

}
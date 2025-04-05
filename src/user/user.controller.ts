import { Controller, Get, Param, NotFoundException,Body,Post,UsePipes, UseGuards, Req, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { ParseIdPipe } from '../property/pipes/parseIdPipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Role } from 'src/auth/enums/role.enum';
import { get } from 'http';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/roles/role.guard';


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
  //to test this go to login endpoint 1st then go to the access token and copy access token paste it in the delete endpoint
  @Roles(Role.EDITOR,Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    //nest js cast id string to integar 
    return this.userService.remove(+id);
  }

}
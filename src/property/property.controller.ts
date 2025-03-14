import { Controller, Get, Post, Body,UsePipes,Param, Patch, Delete } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import {
  CreatePropertyZodDto,
    createPropertySchema,
  } from './dto/createPropertyZod.dto';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}
  
  //validates incoming data against class-validator then creates record using async create method in service
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }
  //we use zod validation in controller to validate data to incoming data against the schema
  //the other method craeting property using zod integration
  // @Post()
  // @UsePipes(new ZodValidationPipe(createPropertySchema))
  // create(@Body() createPropertyZodDto: CreatePropertyZodDto) {
  //   console.log('Received createPropertyZodDto:', createPropertyZodDto);
  //   return this.propertyService.create(createPropertyZodDto);
  // }
  
  //use Patch decorator when updating instead of Post
  @Patch(':id') //passing the id of the record to be updated, in addition to parsing id of object
  update(@Param('id',ParseIdPipe) id: number, @Body() updatePropertyDto: UpdatePropertyDto) {
    console.log("Back to controller");
    return this.propertyService.update(id, updatePropertyDto);
  }
  
  @Delete(':id')
  delete(@Param('id',ParseIdPipe) id: number){
    return this.propertyService.delete(id);
  }
  
  @Get(':id')
  // calling custom pipe ParseIdPipe we've created
  // @UsePipes(ParseIdPipe)
  // parse parameter is a custom pipeline transforms id parameter from a string to a number and validates it
  getProperty(@Param('id',ParseIdPipe) id: number) {
    console.log("inside controller parseidpipe ");
    return this.propertyService.findOne(id);
  }

//   @Get()
//   findAll() {
//     return this.propertyService.findAll();
//   }
}
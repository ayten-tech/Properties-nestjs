import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from '../entities/property.entity';
import { CreatePropertyZodDto } from './dto/createPropertyZod.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}
  
  //POST Request Creating Property
  async create(createPropertyDto: CreatePropertyDto) {
    const property = this.propertyRepository.create(createPropertyDto);
    return await this.propertyRepository.save(property);
  }

  //POST Requset Updating Property , takes extra argument which is id of the object to be updated
  async update(id: number,updatePropertyDto: UpdatePropertyDto) {
    //taskes id of the object to be updated and the data 
    return await this.propertyRepository.update({ id }, updatePropertyDto);
  }
  
  async delete(id: number){
    return await this.propertyRepository.delete({id});
  }

  //GET Request specify id of property
  async findOne(id: number) {
    return this.propertyRepository.findOneBy({ id });
  }


  

  // async findAll(): {
  //   return this.propertyRepository.find();
  // }  
 //first trial before orm
  // create(createPropertyDto: CreatePropertyDto) {
  //   return { message: 'Property created successfully', data: createPropertyDto };
  // }
  
  //create property using zod integration
  // create(createPropertyZodDto: CreatePropertyZodDto) {
  //   return { message: 'Property created successfully', data: createPropertyZodDto };
  // }
}
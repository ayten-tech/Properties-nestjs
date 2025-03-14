//validates zod integration using pipe we won't use it in this project our property is created using class-validator
// the following won't be implemented in our project
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}
    //when user sends request with data the method schema.parse is called to validate and transform the data based on the zod schema
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`The type of value is: ${typeof value}`); 
    try {
      //.parse method returns successful 
      this.schema.parse(value);
      console.log(`The type of value is: ${typeof value}`);
      return value;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.errors);
      }
      throw error;
    }
  }
}

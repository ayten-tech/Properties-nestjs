import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const parsedValue = parseInt(value, 10);
    console.log(`inside parsefunc and parsedValue: ${parsedValue}`);
    if (parsedValue <= 0) {
        console.log("inside the if");
      throw new BadRequestException(`number must be positive: ${value}`);
    }
    //NaN means that the input could not be parsed to a valid string
    if (isNaN(parsedValue)) {
        console.log("inside the if");
      throw new BadRequestException(`Invalid ID format: ${value}`);
    }
    return parsedValue;
  }
}


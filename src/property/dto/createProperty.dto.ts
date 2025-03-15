import { IsString, Length, IsNumber, Min,IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreatePropertyDto {
  @IsString()
  @Length(3, 255)
  name: string;

  @IsString()
  @Length(3, 255)
  description: string;

  @Transform(({ value }) => parseFloat(value)) //accepts string and parse it to integar
  @IsNumber()
  @Min(0)
  @IsPositive()
  // @IsNumber()
  price: number;

}
// this is 
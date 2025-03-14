import { IsInt, IsString, IsOptional, IsNumber, Length, isString, Min,IsPositive} from 'class-validator';
import { Transform } from 'class-transformer'; // for parsing price from string to integar
console.log("inside DTO")
export class UpdatePropertyDto{
    @IsString()
    @Length(3, 255, {message: 'error on length'})
    name: string;
    
    @IsString()
    description: string

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @Min(0)
    @IsPositive()
    price: number;
}
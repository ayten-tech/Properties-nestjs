import { IsInt, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
    @IsOptional()
    @Type(() => Number) // Transforms query params to numbers
    @IsInt()
    @Min(0, { message: 'No negative numbers' })
    skip?: number;
    
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1, { message: 'Limit must be at least 1' })
    limit?: number;
    
  }
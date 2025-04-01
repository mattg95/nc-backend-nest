import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDTO {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? Number(value) : value))
  skip: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? Number(value) : value))
  limit: number;
}

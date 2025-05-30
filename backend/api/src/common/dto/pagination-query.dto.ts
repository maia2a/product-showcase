import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number) // Transforma o valor para um número
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100) // Limite máximo de itens por página
  @Type(() => Number) // Transforma o valor para um número
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}

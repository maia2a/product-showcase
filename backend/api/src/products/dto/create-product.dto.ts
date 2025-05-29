import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  name: string; //Validação de nome

  @IsString()
  @IsOptional() //Descrição é opcional
  @MaxLength(1000)
  description: string; //Validação de descrição

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number; //Validação de preço

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  imageUrl?: string; //Validação de imagem url
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import type { PaginationResult } from 'src/common/interfaces/pagination-result.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto); // Ele chama o método create do service para criar o produto
  }

  @Get() // Endpoint para obter todos os produtos
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  ) // Garante a transformação e validação dos query params
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<PaginationResult<Product>> {
    return this.productsService.findAll(paginationQuery); // Ele chama o método findAll do service para buscar todos os produtos
  }

  @Get(':id') // Endpoint para obter um produto específico
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id); // Ele chama o método findOne do service para buscar um produto específico
  }
}

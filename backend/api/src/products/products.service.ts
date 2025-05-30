/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = this.productRepository.create(createProductDto);
      return await this.productRepository.save(newProduct);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Product already exists');
      }
      console.error('Error creating product:', error);
      throw new InternalServerErrorException('Error creating product');
    }
  }

  async findAll(searchTerm?: string): Promise<Product[]> {
    try {
      if (searchTerm) {
        return await this.productRepository.find({
          where: [
            { name: ILike(`%${searchTerm}%`) },
            { description: ILike(`%${searchTerm}%`) },
          ],
          order: {
            name: 'ASC',
          },
        });
      } else {
        return await this.productRepository.find({
          order: {
            name: 'ASC',
          },
        });
      }
    } catch (error) {
      console.error('Error fetching all products', error);
      throw new InternalServerErrorException('Error fetching all products');
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException(`Product with ID "${id}" not found.`);
      }
      return product;
    } catch (error) {
      // If it's already a NotFoundException from our check, rethrow it
      if (error instanceof NotFoundException) {
        throw error;
      }
      // Handle other potential errors, e.g., malformed UUID for id
      if (error.message.includes('invalid input syntax for type uuid')) {
        throw new BadRequestException(
          `Invalid ID format: "${id}". Please provide a valid UUID.`,
        );
      }
      console.error(`Error fetching product with ID "${id}":`, error);
      throw new InternalServerErrorException(
        `Failed to fetch product with ID "${id}".`,
      );
    }
  }
}

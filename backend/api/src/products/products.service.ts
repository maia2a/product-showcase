/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationResult } from 'src/common/interfaces/pagination-result.interface';
import {
  ILike,
  Repository,
  type FindManyOptions,
  type FindOptionsWhere,
} from 'typeorm';
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

  async findAll(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<PaginationResult<Product>> {
    const { page = 1, limit = 10, search: searchTerm } = paginationQueryDto;
    const skip = (page - 1) * limit; // Calcula o número de itens a serem pulados

    let whereConditions:
      | FindOptionsWhere<Product>[]
      | FindOptionsWhere<Product> = {};

    if (searchTerm) {
      whereConditions = [
        { name: ILike(`%${searchTerm}%`) },
        { description: ILike(`%${searchTerm}%`) },
      ];
    }

    const findOptions: FindManyOptions<Product> = {
      where: whereConditions,
      order: {
        name: 'ASC',
      },
      take: limit,
      skip: skip,
    };

    try {
      const [items, totalItems] =
        await this.productRepository.findAndCount(findOptions);

      return {
        data: items,
        meta: {
          totalItems,
          itemsPerPage: Number(limit),
          totalPages: Math.ceil(totalItems / limit),
          currentPage: Number(page),
        },
      };
    } catch (error) {
      console.error('Error fetching paginated products', error);
      throw new InternalServerErrorException(
        'Failed to fetch paginated products',
      );
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

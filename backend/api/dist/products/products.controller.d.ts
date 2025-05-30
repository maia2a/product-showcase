import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import type { PaginationResult } from 'src/common/interfaces/pagination-result.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(paginationQuery: PaginationQueryDto): Promise<PaginationResult<Product>>;
    findOne(id: string): Promise<Product>;
}

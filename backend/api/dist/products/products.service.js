"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async create(createProductDto) {
        try {
            const newProduct = this.productRepository.create(createProductDto);
            return await this.productRepository.save(newProduct);
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('Product already exists');
            }
            console.error('Error creating product:', error);
            throw new common_1.InternalServerErrorException('Error creating product');
        }
    }
    async findAll(paginationQueryDto) {
        const { page = 1, limit = 10, search: searchTerm } = paginationQueryDto;
        const skip = (page - 1) * limit;
        let whereConditions = {};
        if (searchTerm) {
            whereConditions = [
                { name: (0, typeorm_2.ILike)(`%${searchTerm}%`) },
                { description: (0, typeorm_2.ILike)(`%${searchTerm}%`) },
            ];
        }
        const findOptions = {
            where: whereConditions,
            order: {
                name: 'ASC',
            },
            take: limit,
            skip: skip,
        };
        try {
            const [items, totalItems] = await this.productRepository.findAndCount(findOptions);
            return {
                data: items,
                meta: {
                    totalItems,
                    itemsPerPage: Number(limit),
                    totalPages: Math.ceil(totalItems / limit),
                    currentPage: Number(page),
                },
            };
        }
        catch (error) {
            console.error('Error fetching paginated products', error);
            throw new common_1.InternalServerErrorException('Failed to fetch paginated products');
        }
    }
    async findOne(id) {
        try {
            const product = await this.productRepository.findOneBy({ id });
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID "${id}" not found.`);
            }
            return product;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error.message.includes('invalid input syntax for type uuid')) {
                throw new common_1.BadRequestException(`Invalid ID format: "${id}". Please provide a valid UUID.`);
            }
            console.error(`Error fetching product with ID "${id}":`, error);
            throw new common_1.InternalServerErrorException(`Failed to fetch product with ID "${id}".`);
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map
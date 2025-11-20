import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";
import { Category } from "../categories/category.entity";

@Controller('products')
export class ProductController {

    constructor(
        private readonly service: ProductService,
    ) { }

    @Get()
    findAll(): Promise<Product[]> {
        return this.service.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Product | null> {
        const found = this.service.findByID(id);

        if (!found) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        return found;
    }

    @Post()
    create(@Body() product: Product): Promise<Product> {
        return this.service.save(product);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() product: Product): Promise<Product> {

        const found = await this.service.findByID(id);

        if (!found) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        product.id = id;

        return this.service.save(product);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {

        const found = await this.service.findByID(id);

        if (!found) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        return this.service.remove(id);

    }


    @Post(':id/rating')
    async rateProduct(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('rating') rating: number
    ) {
        if (!rating || rating < 1 || rating > 5) {
            throw new HttpException('Rating should be between 1 and 5', HttpStatus.BAD_REQUEST);
        }

        const product = await this.service.findByID(id);

        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        const newAverage =
            (product.rating * product.ratingsCount + rating) /
            (product.ratingsCount + 1);

        product.rating = newAverage;
        product.ratingsCount = product.ratingsCount + 1;

        return this.service.save(product);
    }
}
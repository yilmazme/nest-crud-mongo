import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productsService.allProducts();
  }
  @Get(':id')
  getOneProduct(@Param('id') id: string): Promise<Product | string> {
    return this.productsService.oneProduct(id);
  }

  @Post()
  createProduct(@Body() product: CreateProductDto): Promise<Product | string> {
    return this.productsService.addProduct(product);
  }
  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<string> {
    return this.productsService.deleteProduct(id);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
  ): Promise<Product | string> {
    return this.productsService.updateOne(id, product);
  }
}

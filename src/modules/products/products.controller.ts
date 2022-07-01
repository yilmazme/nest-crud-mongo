import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Product } from 'src/modules/products/dto/product.dto';
import { ProductsService } from './products.service';

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
  createProduct(@Body() product: Product): Promise<Product | string> {
    return this.productsService.addProduct(product);
  }
}

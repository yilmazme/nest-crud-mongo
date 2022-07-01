import { Injectable } from '@nestjs/common';
import { Product } from 'src/modules/products/dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async allProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async oneProduct(id: string): Promise<Product | string> {
    try {
      return await this.productModel.findOne({ _id: id });
    } catch (error) {
      return `no product with id: ${id}`;
    }
  }

  async addProduct(product: Product): Promise<Product | string> {
    const sameProduct = await this.productModel
      .findOne({ name: product.name })
      .exec();
    if (sameProduct) {
      return `product alreeady exist`;
    }
    try {
      const newProduct = new this.productModel(product);
      await newProduct.save();
      console.log(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteProduct(id: string): Promise<string> {
    try {
      await this.productModel.findOneAndDelete({ _id: id });
      return `product with id: ${id} deleted`;
    } catch (error) {
      return `no product with id: ${id}`;
    }
  }

  async updateOne(id: string, product: Product): Promise<string> {
    await this.productModel.findOneAndUpdate({ _id: id }, product, {
      new: true,
    });
    return `product with id: ${id} updated`;
  }
}

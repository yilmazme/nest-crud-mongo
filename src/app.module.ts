/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './modules/customers/customer.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    CustomersModule,
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://myilmaz:RytI8kQasxewz5jh7p1e@nest-cluster.1dexpms.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
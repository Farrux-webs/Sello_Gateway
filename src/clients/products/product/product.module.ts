import { Global, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  exports: [ProductService],
  providers: [ProductService],
})
export class ProductModule {}

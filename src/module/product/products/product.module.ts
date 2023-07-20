import { Module } from '@nestjs/common';
import { ProductModule } from '@clients';
import { ProductController } from './product.controller';

@Module({
  imports: [ProductModule],
  controllers: [ProductController],
})
export class ProductGatewayModule {}

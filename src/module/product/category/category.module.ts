import { Module } from '@nestjs/common';
import { CategoryModule } from '@clients';
import { CategoryController } from './category.controller';

@Module({
  imports: [CategoryModule],
  controllers: [CategoryController],
})
export class CategoryGatewayModule {}

import { Module } from '@nestjs/common';
import { SubCategoryModule } from '@clients';
import { SubCategoryController } from './subcategory.controller';

@Module({
  imports: [SubCategoryModule],
  controllers: [SubCategoryController],
})
export class SubCategoryGatewayModule {}

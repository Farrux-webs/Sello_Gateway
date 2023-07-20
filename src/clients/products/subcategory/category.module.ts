import { Global, Module } from '@nestjs/common';
import { SubCategoryService } from './category.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  exports: [SubCategoryService],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}

import { Global, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  exports: [CategoryService],
  providers: [CategoryService],
})
export class CategoryModule {}

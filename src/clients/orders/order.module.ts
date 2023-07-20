import { Global, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  exports: [OrderService],
  providers: [OrderService],
})
export class OrderModule {}

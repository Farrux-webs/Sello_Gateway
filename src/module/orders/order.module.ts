import { Module } from '@nestjs/common';
import { OrderModule } from '@clients';
import { OrderController } from './order.controller';

@Module({
  imports: [OrderModule],
  controllers: [OrderController],
})
export class OrderGatewayModule {}

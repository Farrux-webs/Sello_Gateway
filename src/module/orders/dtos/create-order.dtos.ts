import { ApiProperty } from '@nestjs/swagger';
import type { CreateOrderRequest, CreateOrderResponse } from '@clients';

export class CreateOrderDto implements CreateOrderRequest {
  @ApiProperty({
    example: 1,
  })
  count: number;
}
export class CreateOrderResponseDto implements CreateOrderResponse {
  @ApiProperty({
    example: 'created',
  })
  message: 'created';
}

import { ApiProperty } from '@nestjs/swagger';
import type { UpdateOrderRequest, UpdateOrderResponse } from '@clients';

export class UpdateOrderDto implements UpdateOrderRequest {
  @ApiProperty({
    example: 1,
  })
  count: number;
}
export class UpdateOrderResponseDto implements UpdateOrderResponse {
  @ApiProperty({
    example: 'created',
  })
  message: 'created';
}
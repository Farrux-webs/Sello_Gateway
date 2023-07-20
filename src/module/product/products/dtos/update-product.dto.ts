import { ApiProperty } from '@nestjs/swagger';
import type { UpdateProductRequest, UpdateProductResponse } from '@clients';

export class UpdateProductDto implements UpdateProductRequest {
  @ApiProperty({
    example: 'Iphone 14 pro max',
  })
  title: string;

  @ApiProperty({
    example: 'ervevewrbwrbrwbtwrbw',
  })
  descr: string;

  @ApiProperty({
    example: '$200',
  })
  price: string;
}

export class UpdateProductResponseDto implements UpdateProductResponse {
  @ApiProperty({
    example: 'updated',
  })
  message: string;
}

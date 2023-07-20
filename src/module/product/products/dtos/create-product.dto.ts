import { ApiProperty } from '@nestjs/swagger';
import type { CreateProductRequest, CreateProductResponse } from '@clients';

export class CreateProductDto implements CreateProductRequest {
  @ApiProperty({
    example: 'elektronika',
  })
  title: string;

  @ApiProperty({
    example: 'iwdbciwvcjevchjervchkjervchkj',
  })
  descr: string;

  @ApiProperty({
    example: '$200',
  })
  price: string;

  @ApiProperty({
    example: '$200',
  })
  subcategoryId: string;
}

export class CreateProductResponseDto implements CreateProductResponse {
  @ApiProperty({
    example: 'Created',
  })
  message: string;
}

import { ApiProperty } from '@nestjs/swagger';
import type { CreateCategoryRequest, CreateCategoryResponse } from '@clients';

export class CreateCategoryDto implements CreateCategoryRequest {
  @ApiProperty({
    example: 'elektronika',
  })
  title: string;
}

export class CreateCategoryResponseDto implements CreateCategoryResponse {
  @ApiProperty({
    example: 'Created',
  })
  message: string;
}

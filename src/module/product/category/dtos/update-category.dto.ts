import { ApiProperty } from '@nestjs/swagger';
import type { UpdateCategoryRequest, UpdateCategoryResponse } from '@clients';

export class UpdateCategoryDto implements UpdateCategoryRequest {
  @ApiProperty({
    example: 'elektronika',
  })
  title: string;
}

export class UpdateCategoryResponseDto implements UpdateCategoryResponse {
  @ApiProperty({
    example: 'Created',
  })
  message: string;
}

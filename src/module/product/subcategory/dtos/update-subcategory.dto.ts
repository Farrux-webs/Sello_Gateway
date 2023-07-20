import { ApiProperty } from '@nestjs/swagger';
import type { UpdateSubCategoryRequest, UpdateSubCategoryResponse } from '@clients';

export class UpdateSubCategoryDto implements UpdateSubCategoryRequest {
  @ApiProperty({
    example: 'elektronika',
  })
  title: string;
}

export class UpdateSubCategoryResponseDto implements UpdateSubCategoryResponse {
  @ApiProperty({
    example: 'Created',
  })
  message: string;
}

import { ApiProperty } from '@nestjs/swagger';
import type { CreateSubCategoryRequest, CreateSubCategoryResponse } from '@clients';

export class CreateSubCategoryDto implements CreateSubCategoryRequest {
  @ApiProperty({
    example: 'elektronika',
  })
  title: string;
  @ApiProperty({
    example: 'elektronika',
  })
  categoryId: string;

}

export class CreateSubCategoryResponseDto implements CreateSubCategoryResponse {
  @ApiProperty({
    example: 'Created',
  })
  message: string;
}

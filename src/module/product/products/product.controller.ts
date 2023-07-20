import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { ProductService } from '@clients';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
  ApiHeaders,
} from '@nestjs/swagger';
import {
  CreateProductDto,
  CreateProductResponseDto,
  UpdateProductDto,
  UpdateProductResponseDto,
} from './dtos';
import type {
  CreateProductRequest,
  UpdateProductRequest,
  RetrieveProductResponse,
} from '@clients';




@ApiTags('Products')
@Controller({
  path: 'product-service',
  version: '1',
})
export class ProductController {
  readonly #_service: ProductService;

  constructor(service: ProductService) {
    this.#_service = service;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(['create', 'create/:SubCategoryId'])
  @ApiBody({ type: CreateProductDto })
  @ApiOkResponse({ type: CreateProductResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  create(
    @Query('SubCategoryId') SubCategoryId: string,
    @Body() body: CreateProductRequest,
  ) {
    body.subcategoryId = SubCategoryId;
    return this.#_service.create(body);
  }

  @HttpCode(HttpStatus.CREATED)
  @Put('update/:id')
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponse({ type: UpdateProductResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(@Body() body: UpdateProductRequest) {
    return this.#_service.Put(body);
  }

  @HttpCode(HttpStatus.OK)
  @Get('retrieve')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  retrieveAll(): Promise<RetrieveProductResponse> {
    return this.#_service.retrieveAll();
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  delete(@Param('id') id: string) {

    return this.#_service.delete(id);
  }
}

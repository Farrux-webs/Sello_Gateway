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
import { SubCategoryService } from '@clients';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
} from '@nestjs/swagger';
import {
  CreateSubCategoryDto,
  CreateSubCategoryResponseDto,
  UpdateSubCategoryDto,
  UpdateSubCategoryResponseDto,
} from './dtos';
import type {
  CreateSubCategoryRequest,
  UpdateSubCategoryRequest,
  RetrieveSubCategoryResponse,
} from '@clients';

@ApiTags('SubCategory')
@Controller({
  path: 'subcategory-service',
  version: '1',
})
export class SubCategoryController {
  readonly #_service: SubCategoryService;

  constructor(service: SubCategoryService) {
    this.#_service = service;
  }

  @HttpCode(HttpStatus.OK)
  @Post(['create', 'create/:CategoryId'])
  @ApiBody({ type: CreateSubCategoryDto })
  @ApiOkResponse({ type: CreateSubCategoryResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  create(
    @Query('CategoryId') CategoryId: string,
    @Body() body: CreateSubCategoryRequest,
  ) {
    body.categoryId = CategoryId;
    return this.#_service.create(body);
  }

  @HttpCode(HttpStatus.OK)
  @Put('update/:id')
  @ApiBody({ type: UpdateSubCategoryDto })
  @ApiOkResponse({ type: UpdateSubCategoryResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(@Body() body: UpdateSubCategoryRequest) {
    return this.#_service.Put(body);
  }

  @HttpCode(HttpStatus.OK)
  @Get('retrieve')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  retrieveAll(): Promise<RetrieveSubCategoryResponse> {
    
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

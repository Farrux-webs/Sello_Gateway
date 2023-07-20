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
} from '@nestjs/common';
import { CategoryService } from '@clients';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
} from '@nestjs/swagger';
import {
  CreateCategoryDto,
  CreateCategoryResponseDto,
  UpdateCategoryDto,
  UpdateCategoryResponseDto,
} from './dtos';
import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  RetrieveCategoryResponse,
} from '@clients';

@ApiTags('Category')
@Controller({
  path: 'category-service',
  version: '1',
})
export class CategoryController {
  readonly #_service: CategoryService;

  constructor(service: CategoryService) {
    this.#_service = service;
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @ApiBody({ type: CreateCategoryDto })
  @ApiOkResponse({ type: CreateCategoryResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  create(@Body() body: CreateCategoryRequest) {
    return this.#_service.create(body);
  }

  @HttpCode(HttpStatus.OK)
  @Put('update/:id')
  @ApiBody({ type: UpdateCategoryDto })
  @ApiOkResponse({ type: UpdateCategoryResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(@Body() body: UpdateCategoryRequest) {
    return this.#_service.Put(body);
  }

  @HttpCode(HttpStatus.OK)
  @Get('retrieve')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  retrieveAll(): Promise<RetrieveCategoryResponse> {
    
    
    return this.#_service.retrieveAll();
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  delete(@Param('id') id: string) {
    console.log(id);
    
    
    return this.#_service.delete(id);
  }
}

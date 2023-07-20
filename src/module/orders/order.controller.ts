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
  UseInterceptors,
  Request
} from '@nestjs/common';
import { OrderService } from '@clients';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
} from '@nestjs/swagger';
import {
  CreateOrderDto,
  CreateOrderResponseDto,
  UpdateOrderDto,
  UpdateOrderResponseDto,
} from './dtos';
import type {
  CreateOrderRequest,
  UpdateOrderRequest,
  RetrieveOrderResponse,
} from '@clients';
import * as jwt from 'jsonwebtoken';
import { VerifyAccessInterceptor } from "@interceptors"



@UseInterceptors(VerifyAccessInterceptor)
@ApiTags('Orders')
@Controller({
  path: 'order-service',
  version: '1',
})
export class OrderController {
  readonly #_service: OrderService;

  constructor(service: OrderService) {
    this.#_service = service;
  }

  @HttpCode(HttpStatus.OK)
  @Post(['create', 'create/:productId'])
  @ApiBody({ type: CreateOrderDto })
  @ApiOkResponse({ type: CreateOrderResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  create(
    @Query('productId') productId: string,
    @Body()
    body: CreateOrderRequest,
  ) {
    body.productId = productId;
    return this.#_service.create(body);
  }

  @HttpCode(HttpStatus.OK)
  @Put(['update', 'update/:productId'])
  @ApiBody({ type: UpdateOrderDto })
  @ApiOkResponse({ type: UpdateOrderResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(
    @Query('productId') productId: string,
    @Body()
    body: UpdateOrderRequest,
  ) {
    body.productId = productId;
    return this.#_service.Put(body);
  }

  @HttpCode(HttpStatus.OK)
  @Get('retrieve')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  retrieveAll(): Promise<RetrieveOrderResponse> {
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

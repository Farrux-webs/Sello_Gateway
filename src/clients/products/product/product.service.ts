import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, timeout } from 'rxjs';
import { PCommand } from './enums';
import type {
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
  RetrieveProductResponse,
} from './interfaces';

@Injectable()
export class ProductService {
  readonly #_client: ClientTCP;
  readonly #_timeout: number;

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('product.host'),
      port: config.getOrThrow<number>('product.port'),
    });

    this.#_timeout = config.getOrThrow<number>('product.timeout');
  }

  async create(payload: CreateProductRequest): Promise<CreateProductResponse> {
    return this.#_send<CreateProductResponse, CreateProductRequest>(
      PCommand.POST_PRODUCT,
      payload,
    );
  }

  async retrieveAll(): Promise<RetrieveProductResponse> {
    return this.#_send(PCommand.RETRIEVE_PRODUCT, {});
  }

  async Put(payload: UpdateProductRequest): Promise<UpdateProductResponse> {
    return this.#_send<UpdateProductResponse, UpdateProductRequest>(
      PCommand.UPDATE_PRODUCT,
      payload,
    );
  }

  async delete(id: string): Promise<Object> {
    console.log(id);

    return this.#_send(PCommand.DELETE_PRODUCT, id);
  }

  async #_connect(): Promise<void> {
    await this.#_client.connect();
  }

  #_disConnect(): void {
    this.#_client.close();
  }

  async #_send<TResponse, TRequest>(
    pattern: string,
    payload: TRequest,
  ): Promise<TResponse> {
    try {
      return await firstValueFrom(
        this.#_client
          .send<TResponse, TRequest>(pattern, payload)
          .pipe(timeout(this.#_timeout)),
      );
    } catch (error: any) {
      if (error.name) {
        throw new HttpException(error.response, error.status);
        console.log(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }
}

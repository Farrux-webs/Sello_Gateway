import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, timeout } from 'rxjs';
import { SCommands } from './enums';
import type {
  CreateSubCategoryRequest,
  CreateSubCategoryResponse,
  UpdateSubCategoryRequest,
  UpdateSubCategoryResponse,
  RetrieveSubCategoryResponse,
} from './interfaces';

@Injectable()
export class SubCategoryService {
  readonly #_client: ClientTCP;
  readonly #_timeout: number;

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('product.host'),
      port: config.getOrThrow<number>('product.port'),
    });

    this.#_timeout = config.getOrThrow<number>('product.timeout');
  }

  async create(
    payload: CreateSubCategoryRequest,
  ): Promise<CreateSubCategoryResponse> {
    return this.#_send<CreateSubCategoryResponse, CreateSubCategoryRequest>(
      SCommands.CREATE_SUBCATEGORY,
      payload,
    );
  }

  async retrieveAll(): Promise<RetrieveSubCategoryResponse> {
    return this.#_send(SCommands.RETRIEVE_SUBCATEGORY, {});
  }

  async Put(
    payload: UpdateSubCategoryRequest,
  ): Promise<UpdateSubCategoryResponse> {
    return this.#_send<UpdateSubCategoryResponse, UpdateSubCategoryRequest>(
      SCommands.UPDATE_SUBCATEGORY,
      payload,
    );
  }

  async delete(id: string): Promise<Object> {
    return this.#_send(SCommands.DELETE_SUBCATEGORY, id);
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
    id?: string,
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

import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, timeout } from 'rxjs';
import { Command } from './enums';
import type {
  CreateCategoryRequest,
  CreateCategoryResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
  RetrieveCategoryResponse,
} from './interfaces';



@Injectable()
export class CategoryService {
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
    payload: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> {
    return this.#_send<CreateCategoryResponse, CreateCategoryRequest>(
      Command.CREATE_CATEGORY,
      payload,
    );
  }

  async retrieveAll(): Promise<RetrieveCategoryResponse> {
    return this.#_send(Command.RETRIEVE_CATEGORY, {});
  }

  async Put(
    payload: UpdateCategoryRequest,
  ): Promise<UpdateCategoryResponse> {
    console.log(payload);

    return this.#_send<UpdateCategoryResponse, UpdateCategoryRequest>(
      Command.UPDATE_CATEGORY,
      payload,
    );
  }

  async delete(id: string): Promise<Object> {
    console.log(id);
    
    return this.#_send(Command.DELETE_CATEGORY, id);
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




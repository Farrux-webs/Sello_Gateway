import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, timeout } from 'rxjs';
import { OCommand } from './enums';
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
  RetrieveOrderResponse,
} from './interfaces';

@Injectable()
export class OrderService {
  readonly #_client: ClientTCP;
  readonly #_timeout: number;

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('user.host'),
      port: config.getOrThrow<number>('user.port'),
    });

    this.#_timeout = config.getOrThrow<number>('user.timeout');
  }

  async create(payload: CreateOrderRequest): Promise<CreateOrderResponse> {
    
    return this.#_send<CreateOrderResponse, CreateOrderRequest>(
      OCommand.CREATE_ORDER,
      payload,
    );
  }

  async retrieveAll(): Promise<RetrieveOrderResponse> {
    return this.#_send(OCommand.RETRIEVE_ORDER, {});
  }

  async Put(payload: UpdateOrderRequest): Promise<UpdateOrderResponse> {

    console.log(payload);
    

    return this.#_send<UpdateOrderResponse, UpdateOrderRequest>(
      OCommand.UPDATE_ORDER,
      payload,
    );
  }

  async delete(id: string): Promise<Object> {
    console.log(id);

    return this.#_send(OCommand.DELETE_ORDER, id);
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

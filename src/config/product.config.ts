import { registerAs } from '@nestjs/config';

declare interface ProductServiceOptions {
  host: string;
  port: number;
  timeout: number;
}

export const productConfig = registerAs<ProductServiceOptions>(
  'product',
  (): ProductServiceOptions => ({
    host: process.env.PRODUCT_SERVICE_HOST,
    port: process.env.PRODUCT_SERVICE_PORT
      ? parseInt(process.env.PRODUCT_SERVICE_PORT, 10)
      : undefined,
    timeout: process.env.PRODUCT_SERVICE_TIMOUT
      ? parseInt(process.env.PRODUCT_SERVICE_TIMOUT, 10)
      : undefined,
  }),
);

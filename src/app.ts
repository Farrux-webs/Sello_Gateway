import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { userConfig, productConfig } from '@config';
import {
  UserGatewayModule,
  CategoryGatewayModule,
  SubCategoryGatewayModule,
  ProductGatewayModule,
  OrderGatewayModule,
} from '@module';




@Module({
  imports: [
    ConfigModule.forRoot({
      load: [userConfig, productConfig],
      isGlobal: true,
    }),
    UserGatewayModule,
    CategoryGatewayModule,
    SubCategoryGatewayModule,
    ProductGatewayModule,
    OrderGatewayModule,
  ],
})
export class App {}

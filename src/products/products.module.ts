import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE, ORDER_SERVICE, PRODUCT_SERVICE } from 'src/config';
import { object } from 'joi';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        // name: PRODUCT_SERVICE,
        name: NATS_SERVICE,
        //transport: Transport.TCP,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
          // host: envs.productMicroserviceHost,
          // port: envs.productMicroservicePort,
        }
      },
    ])
  ]
})
export class ProductsModule {

  //   constructor() {
  //   console.log({envs})
  // }


}

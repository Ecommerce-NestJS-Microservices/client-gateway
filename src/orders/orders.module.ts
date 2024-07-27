import { Module } from '@nestjs/common';
//import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICE } from 'src/config';

@Module({
  controllers: [OrdersController],
  // providers: [OrdersService],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE, // name given to inject in controller 
        transport: Transport.TCP,
        options: {
          // host: envs.orderMicroserviceHost,
          // port: envs.orderMicroservicePort
        }
      }
    ])
  ]
})
export class OrdersModule {}

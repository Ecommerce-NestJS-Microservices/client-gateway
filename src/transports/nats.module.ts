import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE, envs } from 'src/config';

@Module({
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
    ],
    // in order to use to other module could be use
    exports: [

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
export class NatsModule { }

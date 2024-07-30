import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {

  const logger = new Logger('Main-Gateway');

  console.log('hola mundo')
  console.log(envs.natsServers);


  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  app.useGlobalFilters(new RpcCustomExceptionFilter())

  await app.listen(envs.port);
  console.log('segundo cambio !')

  logger.log(`Gateway running on port ${envs.port}`);
}
bootstrap();

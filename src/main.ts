import { NestFactory } from '@nestjs/core';
//import { RoitResponseInterceptor } from '@roit/roit-response-handler';
import { AppModule } from './app.module';
import { Environment } from 'roit-environment';
import { CepResponseInterceptor} from './cep.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.useGlobalFilters(new HttpExceptionFilter());
  //app.useGlobalInterceptors(new RoitResponseInterceptor());

  app.useGlobalInterceptors(new CepResponseInterceptor());

  //app.setGlobalPrefix('api');

  await app.listen(Environment.getProperty("port"));
}

bootstrap();
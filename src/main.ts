import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { Environment } from 'roit-environment';

//import { LoggingInterceptor } from './login.interceptor';
import { CepResponseInterceptor} from './cep.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new CepResponseInterceptor());
  //app.useGlobalInterceptors(new LoggingInterceptor());

  //app.setGlobalPrefix('api');

  //let port = Environment.getProperty("port");
  
  await app.listen(3000);
}
bootstrap();

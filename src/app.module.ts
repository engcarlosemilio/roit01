import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoaModule } from './pessoa/pessoa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environment } from 'roit-environment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: Environment.getProperty("mysql.host"),
      port: 3306,
      username: Environment.getProperty("mysql.user"),
      password: Environment.getProperty("mysql.pass"),
      database: Environment.getProperty("mysql.database"),
      autoLoadEntities:  Environment.currentEnv() == 'dev' ? true: false,  //Não usar em ambiente de produção. Isso aqui deleta todas as tabelas e as recria
      synchronize: Environment.getProperty("mysql.synchronize") == 'true'? true: false,
    }),
    PessoaModule],
  controllers: [AppController],
  providers: [AppService],
})

/// Para aprendizado: In order to solve it you have to remove the ItemsController and ItemsService imports from the app.module.ts file.
// https://stackoverflow.com/questions/56870498/nest-cant-resolve-dependencies-of-the-itemsservice-please-make-sure-that-t

// Estava acontecendo um erro ao iniciar a aplicação. 
// pra resolver mudei as seguintes linhas:
// controllers: [AppController, PessoaController],
// providers: [AppService, PessoaService],
// Provavelmente esses dois itens foram colocados aí pelo meu editor. VS Code...


export class AppModule {}

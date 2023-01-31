import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { SignupLoginModule } from './signup-login/signup-login.module';


@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'ramdasJadhav@12345',
    database:'user',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true,
  }),SignupLoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

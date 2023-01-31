import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { SignupLoginController } from './signup-login.controller';
import { SignupLoginService } from './signup-login.service';
import { UsersEntity } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]),PassportModule,
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async () => ({
      secret:`${process.env.JWT_SECRET}.env`,
    }),
    inject: [ConfigService],
  })],
  controllers: [SignupLoginController],
  providers: [SignupLoginService,JwtStrategy],
})

export class SignupLoginModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
      TypeOrmModule.forFeature([User]),
      PassportModule,
      JwtModule.registerAsync(jwtConfig.asProvider()),
      ConfigModule.forFeature(jwtConfig)
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService,LocalStrategy,JwtStrategy]
})
export class AuthModule {}
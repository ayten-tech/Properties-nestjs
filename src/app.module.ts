import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from './config/db.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule,UserModule,PropertyModule,TypeOrmModule.forRoot(pgConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

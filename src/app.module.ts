import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import database from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[database]
    }),
    UserModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

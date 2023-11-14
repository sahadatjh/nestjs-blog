import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from 'nestjs-config';
import { DatabaseService } from './shared/services/database.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  const configurationService = app.get(ConfigService);
  const databaseService = app.get(DatabaseService);

  if (configurationService.get('database.migrations.enabled')) {
    await databaseService.runMigration();
  }

  if (configurationService.get('database.seeds.enabled')) {
    await databaseService.runSeed();
  } 

  await app.listen(configurationService.get('server.port'));
}

bootstrap().catch(console.error);

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  console.log('DATABASE_URL:', configService.get<string>('DATABASE_URL'));

  const config = new DocumentBuilder()
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
    })
    .setTitle('I dont know')
    .setDescription('idk API description')
    .setVersion('0.0.1')
    .build();
  const documrntFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documrntFactory);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();

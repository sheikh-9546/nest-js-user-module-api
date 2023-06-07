import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Form Insurance APP')
    .setDescription('Form Insurance Learing apis')
    .setVersion('1.0')
    .addTag('Form Insurance')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap()
    .then(() => Logger.log(`Server Started on ${process.env.SERVER_PORT}`))
    .catch((error) => Logger.error(error.message));

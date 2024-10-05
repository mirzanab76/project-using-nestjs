import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: { enableImplicitConversion: true },
    exceptionFactory: (errors) => {
      const result = errors.map((error) => ({
        property: error.property,
        message: Object.values(error.constraints || {}).join(', '),
      }));
      return new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        errors: result,
      });
    },
  }));
  await app.listen(3000);
}
bootstrap();
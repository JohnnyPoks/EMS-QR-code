import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/validation.pipe';
import { HttpExceptionFilter } from './common/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Equivalent to header('Access-Control-Allow-Origin: *');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter()); // To handle exceptions
  await app.listen(3000);
}
bootstrap();

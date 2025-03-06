import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', // Allow frontend domain
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allowed headers
  });

  await app.listen(3000);
}
bootstrap();

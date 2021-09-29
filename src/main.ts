import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env, port } from './helpers/config';
import { TransformInterceptor } from './transform.interceptor';
const baseRouteController = env === 'development' ? 'api' : '';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(baseRouteController);
  app.useGlobalInterceptors(new TransformInterceptor());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('TODOS exercise for VidaTec')
    .setDescription('API for creation and management of TODOS')
    .setVersion('1.0')
    .addTag('todos')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(port);
}
bootstrap();

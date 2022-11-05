require('dotenv').config()
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express'
import cookieParser from 'cookie-parser'

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
  );
  const PORT = process.env.PORT || 5000
  const options = new DocumentBuilder().build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000 }));
  app.enableCors({credentials: true, origin: "*"})
  app.use(cookieParser())
  app.use(express.json({limit: "5mb"}))
  app.use(express.urlencoded({ extended: true, limit: "5mb" }))
  // app.use(cors({credentials: true}))
  // app.use(helmet())
  await app.listen(PORT);
  console.log(`App is running at http://localhost:${PORT}/graphql`)
}
bootstrap();

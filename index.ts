require('dotenv').config()
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express'
import cookieParser from 'cookie-parser'

import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
  );
  const appExpress = express()
  const PORT = process.env.PORT || 5000
  const options = new DocumentBuilder().build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  if (process.env.NODE_ENV === 'production') {
    appExpress.set('trust proxy', 1); // trust first proxy
  }
  // app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000 }));
  app.enableCors({ credentials: true, origin: "https://insta-frontend-gules.vercel.app", allowedHeaders: ["Access-Control-Allow-Origins", "*"] })
  app.use(cookieParser())
  app.use(express.json({ limit: "5mb" }))
  app.use(express.urlencoded({ extended: true, limit: "5mb" }))
  // app.use(cors({ allowedHeaders: "Access-Control-Allow-Origins" }))
  await app.listen(PORT);
  console.log(`App is running at http://localhost:${PORT}/graphql`)
}
bootstrap();

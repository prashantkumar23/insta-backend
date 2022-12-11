require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import express from "express";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appExpress = express();

  const PORT = process.env.PORT || 5000;
  const options = new DocumentBuilder().build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);

  if (process.env.NODE_ENV === "production") {
    appExpress.set("trust proxy", () => true); // trust first proxy
  }
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: [/\.vercel\.app$/],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    exposedHeaders: ["set-cookie"],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization', "Idtoken", "Cookie"],
    preflightContinue: false
  });

  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true, limit: "5mb" }));
  await app.listen(PORT);
  const url = await app.getUrl();
  console.log(`App is running at ${url}`);
}
bootstrap();

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

require('dotenv').config();

const { DB_LOGIN, DB_PASSWORD, DB_BASE_URL } = process.env;

const url = `mongodb+srv://${DB_LOGIN}:${DB_PASSWORD}@${DB_BASE_URL}/?retryWrites=true&w=majority`;

@Module({
  imports: [MongooseModule.forRoot(url)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

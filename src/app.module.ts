import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileController } from './file.controller';
import { WordSchema } from './schemas/word.schema';

require('dotenv').config();

const { DB_LOGIN, DB_PASSWORD, DB_BASE_URL } = process.env;

const hebrewSongsDatabaseUrl = `mongodb+srv://${DB_LOGIN}:${DB_PASSWORD}@${DB_BASE_URL}/HebrewSongs?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forRoot(hebrewSongsDatabaseUrl),
    MongooseModule.forFeature([{ name: 'Word', schema: WordSchema }]),
  ],
  controllers: [AppController, FileController],
  providers: [AppService],
})
export class AppModule {}

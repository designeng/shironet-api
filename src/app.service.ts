// import mongodb from 'mongodb';
const ObjectId = require('objectid');
const fs = require('fs');
import { join } from 'path';
import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

import { createModel, createBucket } from 'mongoose-gridfs';

import { Word } from './interfaces/word.interface';
import { Song } from './interfaces/song.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel('Word') private readonly wordModel: Model<Word>,
  ) {}

  getSongs(): Array<Song> {
    const date = new Date().getTime();
    return [
      {
        id: date,
        title: 'Keren Peles',
        url: 'https://www.youtube.com/embed/g9prCgt9xXM',
      },
      {
        id: date + 1,
        title: 'Chava Alberstein',
        url: 'https://www.youtube.com/embed/UKLzN7qo6QI',
      },
      {
        id: date + 2,
        title: 'שלמה יידוב - חלק ממני',
        url: 'https://www.youtube.com/embed/Q_fOlog97zI',
      },
    ];
  }

  findAll() {
    return this.wordModel.find().exec();
  }

  storeFileInDb() {
    const bucket = createBucket({
      bucketName: 'file',
      connection: this.connection,
    });
    const _id = new ObjectId();

    const filename = 'test.mp3';
    const readStream = fs.createReadStream(join(process.cwd(), filename));

    const writeStream = bucket.createWriteStream({ _id, filename });
    readStream.pipe(writeStream);
  }
}

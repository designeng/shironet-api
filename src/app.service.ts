// import mongodb from 'mongodb';
const ObjectId = require('objectid');
const fs = require('fs');
import { join } from 'path';
import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

import { createModel, createBucket } from 'mongoose-gridfs';

import { Word } from './interfaces/word.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel('Word') private readonly wordModel: Model<Word>,
  ) {}

  getHello(): string {
    return 'Hebrew songs ' + process.env.DB_LOGIN;
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

import { Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
const ObjectId = require('objectid');
import { createBucket } from 'mongoose-gridfs';

const id = '633af76fa047b07619000001';

@Injectable()
export class FileService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  getReadableStream(filename: String) {
    const bucket = createBucket({
      bucketName: 'file',
      connection: this.connection,
    });

    return bucket.createReadStream({ _id: new ObjectId(id), filename });
  }
}

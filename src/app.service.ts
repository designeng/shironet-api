import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Word } from './interfaces/word.interface';

@Injectable()
export class AppService {
  constructor(@InjectModel('Word') private readonly wordModel: Model<Word>) {}

  getHello(): string {
    return 'Hebrew songs ' + process.env.DB_LOGIN;
  }

  findAll() {
    return this.wordModel.find().exec();
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Song } from './interfaces/song.interface';
import { Word } from './interfaces/word.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/v1/songs')
  getSongs(): Array<Song> {
    return this.appService.getSongs();
  }

  @Get('/all')
  async findAll(): Promise<Word[]> {
    return this.appService.findAll();
  }

  @Get('/upload')
  async storeFileInDb() {
    return this.appService.storeFileInDb();
  }
}

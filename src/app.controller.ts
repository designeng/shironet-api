import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Song } from './interfaces/song.interface';
import { SongDetails } from './interfaces/songDetails.interface';
import { Word } from './interfaces/word.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/v1/songs')
  getSongs(): Array<Song> {
    return this.appService.getSongs();
  }

  @Get('/api/v1/songs/:id')
  getSongDetails(@Param() params): SongDetails {
    const { id } = params;
    return this.appService.getSongDetails(id);
  }

  @Get('/all')
  async findAll(): Promise<Word[]> {
    return this.appService.findAll();
  }

  @Get('/upload')
  async storeFileInDb() {
    return this.appService.storeFileInDb();
  }

  @Get('/test')
  async test() {
    return 'test';
  }
}

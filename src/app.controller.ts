import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Word } from './interfaces/word.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/all')
  async findAll(): Promise<Word[]> {
    return this.appService.findAll();
  }
}

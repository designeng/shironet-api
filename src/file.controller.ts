import {
  Controller,
  Get,
  Param,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/mp3/:filename')
  getMp3File(
    @Param() params,
    @Response({ passthrough: true }) res,
  ): StreamableFile {
    const { filename } = params;
    res.set({
      'Content-Type': 'audio/mp3',
    });

    return new StreamableFile(this.fileService.getReadableStream(filename));
  }
}

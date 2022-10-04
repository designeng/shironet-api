import { Controller, Get, Response, StreamableFile } from '@nestjs/common';
import { join } from 'path';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/mp3/:filename')
  getMp3File(
    filename: String,
    @Response({ passthrough: true }) res,
  ): StreamableFile {
    res.set({
      'Content-Type': 'audio/mp3',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });
    return new StreamableFile(this.fileService.getReadableStream(filename));
  }
}

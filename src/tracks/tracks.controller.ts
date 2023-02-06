import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ClassSerializerInterceptor,
  HttpStatus,
  NotFoundException,
  ParseUUIDPipe,
  Put,
  Res,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  async findAll() {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack = await this.tracksService.update(id, updateTrackDto);

    if (!updatedTrack) {
      throw new NotFoundException();
    }

    return updatedTrack;
  }

  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const deletedTrack = await this.tracksService.remove(id);

    if (deletedTrack === null) {
      throw new NotFoundException();
    }

    res.status(HttpStatus.NO_CONTENT).json();
    return;
  }
}

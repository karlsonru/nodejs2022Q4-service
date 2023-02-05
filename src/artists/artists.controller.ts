import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  NotFoundException,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      return new NotFoundException();
    }

    return artist;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const updatedArtist = await this.artistsService.update(id, updateArtistDto);

    if (!updatedArtist) {
      return new NotFoundException();
    }

    return updatedArtist;
  }

  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const deletedArtist = await this.artistsService.remove(id);

    if (!deletedArtist) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
    return;
  }
}

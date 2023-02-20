import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  UnprocessableEntityException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.favoritesService.addTrack(id);

    if (!track) {
      throw new UnprocessableEntityException();
    }

    return;
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.favoritesService.removeTrack(id);

    if (!track) {
      throw new NotFoundException();
    }

    return;
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.favoritesService.addAlbum(id);

    if (!album) {
      throw new UnprocessableEntityException();
    }

    return;
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.favoritesService.removeAlbum(id);

    if (!album) {
      throw new NotFoundException();
    }
    return;
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.favoritesService.addArtist(id);

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    return;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.favoritesService.removeArtist(id);

    if (!artist) {
      throw new NotFoundException();
    }
    return;
  }
}

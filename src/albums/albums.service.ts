import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { database } from '../database/database';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private readonly db = database;

  async create(createAlbumDto: CreateAlbumDto) {
    // если передан artistId - то проверим что artist с таким id существует
    if (createAlbumDto.artistId) {
      const hasArtist = await this.db.artists.find(
        (artist) => artist.id === createAlbumDto.artistId,
      );
      if (!hasArtist) {
        createAlbumDto.artistId = null;
      }
    }

    const newAlbum = new Album(createAlbumDto);

    await this.db.albums.push(newAlbum);
    return newAlbum;
  }

  async findAll() {
    return await this.db.albums;
  }

  async findOne(id: string) {
    const album = await this.db.albums.find((album) => album.id === id);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const idx = await this.db.albums.findIndex((album) => album.id === id);

    if (idx === -1) {
      return null;
    }

    const album = this.db.albums[idx];

    for (const [key, value] of Object.entries(updateAlbumDto)) {
      album[key] = value;
    }

    return album;
  }

  async remove(id: string) {
    const idx = await this.db.albums.findIndex((album) => album.id === id);

    if (idx === -1) return null;

    for (const track of this.db.tracks) {
      if (track.albumId !== id) continue;

      track.albumId = null;
    }

    const favIdx = await this.db.albums.findIndex((album) => album.id === id);

    if (favIdx > -1) {
      await this.db.favorites.albums.splice(favIdx, 1);
    }

    return await this.db.albums.splice(idx, 1);
  }
}

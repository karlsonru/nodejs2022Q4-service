import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async findAll() {
    const excludeFn = function (obj) {
      delete obj['favorite'];
      return obj;
    };

    const artists = this.dataSource.getRepository('Artist');
    const albums = this.dataSource.getRepository('Album');
    const tracks = this.dataSource.getRepository('Track');

    return {
      artists: (await artists.findBy({ favorite: true })).map(excludeFn),
      albums: (await albums.findBy({ favorite: true })).map(excludeFn),
      tracks: (await tracks.findBy({ favorite: true })).map(excludeFn),
    };
  }

  async addTrack(id: string) {
    const tracks = this.dataSource.getRepository('Track');
    const track = await tracks.findOneBy({ id });

    if (!track) return null;

    await tracks.update(id, {
      favorite: true,
    });

    return track;
  }

  async removeTrack(id: string) {
    const tracks = this.dataSource.getRepository('Track');
    const track = await tracks.findOneBy({ id });

    if (!track) return null;

    return await tracks.update(id, {
      favorite: false,
    });
  }

  async addAlbum(id: string) {
    const albums = this.dataSource.getRepository('Album');
    const album = await albums.findOneBy({ id });

    if (!album) return null;

    await albums.update(id, {
      favorite: true,
    });

    return album;
  }

  async removeAlbum(id: string) {
    const albums = this.dataSource.getRepository('Album');
    const album = await albums.findOneBy({ id });

    if (!album) return null;

    return await albums.update(id, {
      favorite: false,
    });
  }

  async addArtist(id: string) {
    const artists = this.dataSource.getRepository('Artist');
    const artist = await artists.findOneBy({ id });

    if (!artist) return null;

    await artists.update(id, {
      favorite: true,
    });

    return artist;
  }

  async removeArtist(id: string) {
    const artists = this.dataSource.getRepository('Artist');
    const artist = await artists.findOneBy({ id });

    if (!artist) return null;

    return await artists.update(id, {
      favorite: false,
    });
  }
}

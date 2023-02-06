import { Injectable } from '@nestjs/common';
import { database } from '../database/database';

@Injectable()
export class FavoritesService {
  private readonly db = database;

  async findAll() {
    return {
      artists: await this.db.favorites.artists.map((id) =>
        this.db.artists.find((artist) => artist.id === id),
      ),
      albums: await this.db.favorites.albums.map((id) =>
        this.db.albums.find((album) => album.id === id),
      ),
      tracks: await this.db.favorites.tracks.map((id) =>
        this.db.tracks.find((track) => track.id === id),
      ),
    };
  }

  async addTrack(id: string) {
    const idx = await this.db.tracks.findIndex((track) => track.id === id);

    if (idx === -1) return null;

    await this.db.favorites.tracks.push(id);
    return this.db.favorites.tracks.length;
  }

  async removeTrack(id: string) {
    const idx = await this.db.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (idx === -1) return null;

    return await this.db.favorites.tracks.splice(idx, 1);
  }

  async addAlbum(id: string) {
    const idx = await this.db.albums.findIndex((album) => album.id === id);

    if (idx === -1) return null;

    await this.db.favorites.albums.push(id);
    return this.db.favorites.albums.length;
  }

  async removeAlbum(id: string) {
    const idx = await this.db.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );

    if (idx === -1) return null;

    return await this.db.favorites.albums.splice(idx, 1);
  }

  async addArtist(id: string) {
    const idx = await this.db.artists.findIndex((artist) => artist.id === id);

    if (idx === -1) return null;

    await this.db.favorites.artists.push(id);
    return this.db.favorites.artists.length;
  }

  async removeArtist(id: string) {
    const idx = await this.db.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (idx === -1) return null;

    return await this.db.favorites.artists.splice(idx, 1);
  }
}

import { database } from '../database/database';
import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  private readonly db = database;

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist(createArtistDto);
    await this.db.artists.push(newArtist);
    return newArtist;
  }

  async findAll() {
    return await this.db.artists;
  }

  async findOne(id: string) {
    const artist = await this.db.artists.find((artist) => artist.id === id);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const idx = await this.db.artists.findIndex((artist) => artist.id === id);

    if (idx === -1) return null;

    const artist = this.db.artists[idx];

    for (const [key, value] of Object.entries(updateArtistDto)) {
      artist[key] = value;
    }

    return artist;
  }

  async remove(id: string) {
    const idx = await this.db.artists.findIndex((artist) => artist.id === id);

    if (idx === -1) return null;

    const artist = await this.db.artists[idx];
    for (const track of this.db.tracks) {
      if (track.artistId !== artist.id) continue;

      track.artistId = null;
    }

    return await this.db.artists.splice(idx, 1);
  }
}

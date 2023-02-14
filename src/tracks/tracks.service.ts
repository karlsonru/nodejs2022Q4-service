import { database } from '../../database/database';
import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  private readonly db = database;

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = new Track(createTrackDto);
    await this.db.tracks.push(newTrack);
    return newTrack;
  }

  async findAll() {
    return await this.db.tracks;
  }

  async findOne(id: string) {
    const track = await this.db.tracks.find((track) => track.id === id);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const idx = await this.db.tracks.findIndex((track) => track.id === id);

    if (idx === -1) {
      return null;
    }

    const track = this.db.tracks[idx];
    for (const [key, value] of Object.entries(updateTrackDto)) {
      track[key] = value;
    }

    return track;
  }

  async remove(id: string) {
    const idx = await this.db.tracks.findIndex((track) => track.id === id);

    if (idx === -1) {
      return null;
    }

    const favIdx = await this.db.favorites.tracks.findIndex(
      (track) => track.id === id,
    );

    if (favIdx > -1) {
      await this.db.favorites.tracks.splice(favIdx, 1);
    }

    return await this.db.tracks.splice(idx, 1);
  }
}

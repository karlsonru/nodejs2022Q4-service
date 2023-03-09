import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = this.tracksRepository.create(createTrackDto);
    await this.tracksRepository.save(newTrack);
    return newTrack;
  }

  async findAll() {
    return await this.tracksRepository.find({});
  }

  async findOne(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) return null;

    const updatedTrack = await this.tracksRepository.save({
      id,
      ...updateTrackDto,
    });

    return updatedTrack;
  }

  async remove(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) return null;

    return await this.tracksRepository.delete(id);
  }
}

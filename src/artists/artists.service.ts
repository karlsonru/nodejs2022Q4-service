import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = this.artistRepository.create(createArtistDto);
    await this.artistRepository.save(newArtist);

    return newArtist;
  }

  async findAll() {
    return await this.artistRepository.find({});
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) return;

    const updatedArtist = await this.artistRepository.save({
      id,
      ...updateArtistDto,
    });

    return updatedArtist;
  }

  async remove(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) return null;

    return await this.artistRepository.delete(id);
  }
}

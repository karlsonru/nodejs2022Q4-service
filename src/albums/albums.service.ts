import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRespository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = this.albumsRespository.create(createAlbumDto);
    await this.albumsRespository.save(newAlbum);
    return newAlbum;
  }

  async findAll() {
    return await this.albumsRespository.find({});
  }

  async findOne(id: string) {
    return await this.albumsRespository.findOneBy({ id });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumsRespository.findOneBy({ id });

    if (!album) return null;

    const updatedAlbum = await this.albumsRespository.save({
      id,
      ...updateAlbumDto,
    });

    return updatedAlbum;
  }

  async remove(id: string) {
    const album = await this.albumsRespository.findOneBy({ id });

    if (!album) return null;

    return await this.albumsRespository.delete({ id });
  }
}

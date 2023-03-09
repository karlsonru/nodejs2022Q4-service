import { OmitType } from '@nestjs/mapped-types';
import { Artist } from '../entities/artist.entity';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateArtistDto extends OmitType(Artist, ['id']) {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

import {
  IsString,
  IsNotEmpty,
  IsNumber,
  ValidateIf,
  IsDefined,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsDefined()
  @ValidateIf((obj) => obj.artistId !== null)
  @IsNotEmpty()
  @IsString()
  artistId: string | null; // refers to Artist
}

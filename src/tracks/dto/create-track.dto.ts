import { IsString, IsNotEmpty, IsNumber, Equals } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @Equals((field) => typeof field === 'string' || typeof field === null)
  artistId: string | null;

  @Equals((field) => typeof field === 'string' || typeof field === null)
  albumId: string | null;
}

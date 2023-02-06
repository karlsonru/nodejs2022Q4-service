import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDefined,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsDefined()
  @ValidateIf((obj) => obj.artistId !== null)
  @IsNotEmpty()
  @IsString()
  artistId: string | null;

  @IsDefined()
  @ValidateIf((obj) => obj.albumId !== null)
  @IsNotEmpty()
  @IsString()
  albumId: string | null;
}

import { randomUUID } from 'node:crypto';

export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor({ name, artistId, albumId, duration }) {
    this.id = randomUUID();
    this.name = name;
    this.artistId = artistId ?? null;
    this.albumId = albumId ?? null;
    this.duration = duration;
  }
}

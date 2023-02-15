import { randomUUID } from 'node:crypto';

export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor({ name, year, artistId }) {
    this.id = randomUUID();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}

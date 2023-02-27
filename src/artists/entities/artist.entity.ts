import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @Column({ default: false })
  @Exclude({ toPlainOnly: true })
  favorite: boolean;

  @OneToMany(() => Album, (album) => album.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  albums: Album[];

  @OneToMany(() => Track, (track) => track.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  tracks: Track[];
}

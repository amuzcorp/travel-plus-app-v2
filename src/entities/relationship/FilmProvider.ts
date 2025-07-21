import { BaseEntity } from '../BaseEntity';

export class FilmProvider extends BaseEntity {
  filmId!: number;
  providerName!: string;
  providerUrl?: string;
} 
import { BaseEntity } from '../BaseEntity';
import { MultiLanguageText } from '../geographic/Continent';

export class FilmingLocation extends BaseEntity {
  title!: MultiLanguageText;
  description?: MultiLanguageText;
  latitude?: number;
  longitude?: number;
  address?: MultiLanguageText;
  imageUrl?: string;
  isActive!: boolean;
} 
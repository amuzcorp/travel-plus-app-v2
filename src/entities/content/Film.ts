import { BaseEntity } from '../BaseEntity';
import { MultiLanguageText } from '../geographic/Continent';

export class Film extends BaseEntity {
  title!: MultiLanguageText;
  description!: MultiLanguageText;
  categoryId?: number;
  continentId?: number;
  imageUrl?: string;
  videoUrl?: string;
  duration?: number;
  isActive!: boolean;
  sortOrder!: number;
} 
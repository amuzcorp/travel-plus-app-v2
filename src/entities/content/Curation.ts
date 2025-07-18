import { BaseEntity } from '../BaseEntity';
import { MultiLanguageText } from '../geographic/Continent';

export class Curation extends BaseEntity {
  countryId?: number;
  title!: MultiLanguageText;
  description?: MultiLanguageText;
  imageUrl?: string;
  isActive!: boolean;
  sortOrder!: number;
} 
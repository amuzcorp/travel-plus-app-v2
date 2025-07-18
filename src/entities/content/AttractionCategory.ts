import { BaseEntity } from '../BaseEntity';
import { MultiLanguageText } from '../geographic/Continent';

export class AttractionCategory extends BaseEntity {
  title!: MultiLanguageText;
  description?: MultiLanguageText;
  icon?: string;
  sortOrder!: number;
} 
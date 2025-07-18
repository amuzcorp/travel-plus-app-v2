import { BaseEntity } from '../BaseEntity';

export interface MultiLanguageText {
  ko?: string;
  en?: string;
  gb?: string;
  de?: string;
  ru?: string;
}

export class Continent extends BaseEntity {
  title!: MultiLanguageText;
  description!: MultiLanguageText;
  icon!: string;
  sortOrder!: number;
} 
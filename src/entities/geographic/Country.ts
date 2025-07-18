import { BaseEntity } from '../BaseEntity';
import { MultiLanguageText } from '../geographic/Continent';

export class Country extends BaseEntity {
  viatorDestinationId?: number;
  continentId?: number;
  subContinentName?: string;
  title!: MultiLanguageText;
  description!: MultiLanguageText;
  curationTitle?: MultiLanguageText;
  iconUrl?: string;
  bigImageUrl?: string;
  imageUrl?: string;
  thumbnailImageUrl?: string;
  isHot!: boolean;
  latitude?: number;
  longitude?: number;
  bestTravelStartMonth?: number;
  bestTravelEndMonth?: number;
  bestTravelTimeText?: MultiLanguageText;
  views!: number;
  sortOrder!: number;
} 
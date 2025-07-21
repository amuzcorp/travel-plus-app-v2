import { BaseEntity } from '../BaseEntity';
import { MultiLanguageText } from '../geographic/Continent';

export interface BlurRegionData {
  x: number;
  y: number;
  width: number;
  height: number;
  displayWidth: number;
  displayHeight: number;
}

export class City extends BaseEntity {
  viatorCountryId?: number;
  viatorDestinationId?: number;
  countryId?: number;
  title!: MultiLanguageText;
  description!: MultiLanguageText;
  thumbnailImageUrl?: string;
  imageUrl?: string;
  blurredImage?: string;
  blurRegionData?: BlurRegionData;
  staticMapUrl?: string;
  bannerMapUrl?: string;
  ottCardMapUrl?: string;
  isHot!: boolean;
  latitude?: number;
  longitude?: number;
  bestTravelStartMonth?: number;
  bestTravelEndMonth?: number;
  bestTravelTimeText?: MultiLanguageText;
  views!: number;
  sortOrder!: number;
} 
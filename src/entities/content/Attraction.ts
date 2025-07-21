import { BaseEntity } from '../BaseEntity';
import { MultiLanguageText } from '../geographic/Continent';

export class Attraction extends BaseEntity {
  continentId?: number;
  categoryId?: number;
  cityId?: number;
  destinationId?: number;
  title!: MultiLanguageText;
  subTitle?: MultiLanguageText;
  description!: MultiLanguageText;
  isHot!: boolean;
  provider?: MultiLanguageText;
  is4k!: boolean;
  isFeatured!: boolean;
  featuredImageUrl?: string;
  isActive!: boolean;
  latitude?: number;
  longitude?: number;
  address?: MultiLanguageText;
  imageUrl?: string;
  thumbnail?: string;
  videoUrl?: string;
  captionUrl?: string;
  panoramaUrl?: string;
  views!: number;
  sortOrder!: number;
} 
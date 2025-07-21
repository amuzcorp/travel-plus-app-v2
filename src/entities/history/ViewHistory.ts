import { BaseEntity } from '../BaseEntity';

export class AttractionViewHistory extends BaseEntity {
  attractionId!: number;
  viewedAt!: Date;
}

export class CityViewHistory extends BaseEntity {
  cityId!: number;
  viewedAt!: Date;
}

export class CountryViewHistory extends BaseEntity {
  countryId!: number;
  viewedAt!: Date;
}

export class FilmViewHistory extends BaseEntity {
  filmId!: number;
  viewedAt!: Date;
} 
import { BaseEntity } from '../BaseEntity';

export class HotTagCoolDown extends BaseEntity {
  attractionId!: number;
  coolDownUntil!: Date;
}

export class CityHotTagCoolDown extends BaseEntity {
  cityId!: number;
  coolDownUntil!: Date;
}

export class CountryHotTagCoolDown extends BaseEntity {
  countryId!: number;
  coolDownUntil!: Date;
} 
import { BaseEntity } from '../BaseEntity';
import { MultiLanguageText } from '../geographic/Continent';

export class Destination extends BaseEntity {
  title!: MultiLanguageText;
  destinationId!: number;
  name!: string;
  type!: string;
  parentDestinationId?: number;
  lookupId!: string;
  destinationUrl?: string;
  defaultCurrencyCode?: string;
  timeZone?: string;
  iataCodes?: string[];
  countryCallingCode?: string;
  languages?: string[];
  latitude?: number;
  longitude?: number;
  sortOrder!: number;
} 
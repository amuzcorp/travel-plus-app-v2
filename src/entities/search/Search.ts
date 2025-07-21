import { BaseEntity } from '../BaseEntity';

export class SearchedKeyword extends BaseEntity {
  attractionId?: number;
  empUserId!: number;
  keyword!: string;
  searchedAt!: Date;
}

export class SearchKeyword extends BaseEntity {
  attractionId?: number;
  keyword!: string;
  searchCount!: number;
} 
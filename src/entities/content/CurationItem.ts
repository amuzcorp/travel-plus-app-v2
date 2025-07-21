import { BaseEntity } from '../BaseEntity';

export class CurationItem extends BaseEntity {
  curationId!: number;
  itemType!: string;
  itemId!: number;
  sortOrder!: number;
} 
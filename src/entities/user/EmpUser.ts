import { BaseEntity } from '../BaseEntity';

export interface UserMetadata {
  [key: string]: any;
}

export class EmpUser extends BaseEntity {
  empNumber!: string;
  name?: string;
  metadata?: UserMetadata;
} 
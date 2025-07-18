import { BaseEntity } from '../BaseEntity';

export class UserAccount extends BaseEntity {
  userId!: number;
  accountType!: string;
  accountData?: any;
} 
import { BaseEntity } from '../BaseEntity';

export class Device extends BaseEntity {
  deviceUuid!: string;
  model?: string;
  osVersion?: string;
  appVersion?: string;
  language?: string;
  lastActiveAt?: Date;
  isActive!: boolean;
} 
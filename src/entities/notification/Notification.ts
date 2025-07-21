import { BaseEntity } from '../BaseEntity';

export class EmpUserNotification extends BaseEntity {
  empUserId!: number;
  title!: string;
  message!: string;
  isRead!: boolean;
  notificationType!: string;
} 
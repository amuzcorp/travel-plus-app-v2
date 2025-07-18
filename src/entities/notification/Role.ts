import { BaseEntity } from '../BaseEntity';

export class Role extends BaseEntity {
  name!: string;
  description?: string;
  permissions?: string[];
}

export class RoleUser extends BaseEntity {
  roleId!: number;
  userId!: number;
} 
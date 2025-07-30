import { BaseEntity } from "../BaseEntity";

export class User extends BaseEntity {
  name?: string;
  email?: string;
  isActive!: boolean;
}

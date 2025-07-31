import { BaseEntity } from "../BaseEntity";

export class UserViewedItem extends BaseEntity {
  empUserId!: number;
  itemType!: string;
  itemId!: number;
  viewedAt!: Date;
}

import { BaseEntity } from "../BaseEntity";

export class UserLuggage extends BaseEntity {
  empUserId!: number;
  luggageData?: any;
}

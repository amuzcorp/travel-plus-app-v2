export abstract class BaseEntity {
  id!: number;
  uuid!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

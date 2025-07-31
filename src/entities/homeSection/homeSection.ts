import HomeItem from "./HomeItem";

export default class HomeSection {
  constructor({
    id,
    uuid,
    title,
    description,
    sortOrder,
    createdAt,
    updatedAt,
    createdAtFormatted,
    updatedAtFormatted,
    items,
  }: {
    id: number;
    uuid: string;
    title: string;
    description?: string;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    createdAtFormatted: string;
    updatedAtFormatted: string;
    items: HomeItem[];
  }) {
    this.id = id;
    this.uuid = uuid;

    this.title = title;
    this.description = description;

    this.sortOrder = sortOrder;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.createdAtFormatted = createdAtFormatted;
    this.updatedAtFormatted = updatedAtFormatted;

    this.items = items;
  }

  id: number;
  uuid: string;

  title: string;
  description?: string;

  sortOrder: number;

  createdAt: Date;
  updatedAt: Date;

  createdAtFormatted: string;
  updatedAtFormatted: string;

  items: HomeItem[];

  static fromJson(json: Record<string, any>): HomeSection {
    return new HomeSection({
      id: json.id,
      uuid: json.uuid,
      title: json.title,
      description: json.description,
      sortOrder: json.sort_order,
      createdAt: new Date(json.created_at),
      updatedAt: new Date(json.updated_at),
      createdAtFormatted: json.created_at_formatted,
      updatedAtFormatted: json.updated_at_formatted,
      items: json.items.map((value: Record<string, any>) =>
        HomeItem.fromJson(value)
      ),
    });
  }
}

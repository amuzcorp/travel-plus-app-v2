import HomeItem from "./homeItem";

export default class HomeSection {
  constructor({
    id,
    uuid,
    title,
    description,
    sectionType,
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
    sectionType: string;
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

    this.sectionType = sectionType;

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

  sectionType: string;

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
      sectionType: json.section_type,
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

  toJson(): Record<string, any> {
    return {
      id: this.id,
      uuid: this.uuid,
      title: this.title,
      description: this.description,
      section_type: this.sectionType,
      sort_order: this.sortOrder,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      created_at_formatted: this.createdAtFormatted,
      updated_at_formatted: this.updatedAtFormatted,
      items: this.items.map((item) => item.toJson()),
    };
  }

  static empty(): HomeSection {
    return new HomeSection({
      id: 0,
      uuid: "",
      title: "",
      description: "",
      sectionType: "",
      sortOrder: 0,
      createdAt: new Date(0), // 1970-01-01
      updatedAt: new Date(0),
      createdAtFormatted: "",
      updatedAtFormatted: "",
      items: [],
    });
  }
}

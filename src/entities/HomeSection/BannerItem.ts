import HomeItem, { HomeItemClass } from "./HomeItem";

export default class BannerItem extends HomeItem {
  constructor({
    id,
    uuid,
    cityId,
    title,
    description,
    categoryId,
    is4k,
    staticMapUrl,
    videoUrl,
    sortOrder,
    createdAt,
    updatedAt,
    deletedAt,
    thumbnailUrl,
    type,
    typeTranslation,
    cityName,
    countryName,
    countryFlag,
  }: {
    id: number;
    uuid: string;
    cityId: number;
    title: string;
    description: string;
    categoryId: number;
    is4k: boolean;
    staticMapUrl: string;
    videoUrl: string;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    thumbnailUrl: string;
    type: string;
    typeTranslation: string;
    cityName: string;
    countryName: string;
    countryFlag: string;
  }) {
    super();

    this.id = id;
    this.uuid = uuid;
    this.cityId = cityId;
    this.title = title;
    this.description = description;
    this.categoryId = categoryId;
    this.is4k = is4k;
    this.staticMapUrl = staticMapUrl;
    this.videoUrl = videoUrl;
    this.sortOrder = sortOrder;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.thumbnailUrl = thumbnailUrl;
    this.type = type;
    this.typeTranslation = typeTranslation;
    this.cityName = cityName;
    this.countryName = countryName;
    this.countryFlag = countryFlag;
  }

  id: number;
  uuid: string;
  cityId: number;
  title: string;
  description: string;
  categoryId: number;
  is4k: boolean;
  staticMapUrl: string;
  videoUrl: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  thumbnailUrl: string;
  type: string;
  typeTranslation: string;
  cityName: string;
  countryName: string;
  countryFlag: string;

  static fromJson(json: Record<string, any>): BannerItem {
    return new BannerItem({
      id: json.id,
      uuid: json.uuid,
      cityId: json.city_id,
      title: json.title,
      description: json.description,
      categoryId: json.category_id,
      is4k: json.is_4k,
      staticMapUrl: json.static_map_url,
      videoUrl: json.video_url,
      sortOrder: json.sort_order,
      createdAt: new Date(json.created_at),
      updatedAt: new Date(json.updated_at),
      deletedAt: json.deleted_at ? new Date(json.deleted_at) : null,
      thumbnailUrl: json.thumbnail_url ?? "",
      type: json.type,
      typeTranslation: json.type_translation,
      cityName: json.city_name,
      countryName: json.country_name,
      countryFlag: json.country_flag,
    });
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      uuid: this.uuid,
      city_id: this.cityId,
      title: this.title,
      description: this.description,
      category_id: this.categoryId,
      is_4k: this.is4k,
      static_map_url: this.staticMapUrl,
      video_url: this.videoUrl,
      sort_order: this.sortOrder,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
      thumbnail_url: this.thumbnailUrl,
      type: this.type,
      type_translation: this.typeTranslation,
      city_name: this.cityName,
      country_name: this.countryName,
      country_flag: this.countryFlag,
    };
  }

  static empty(): BannerItem {
    return new BannerItem({
      id: 0,
      uuid: "",
      cityId: 0,
      title: "",
      description: "",
      categoryId: 0,
      is4k: false,
      staticMapUrl: "",
      videoUrl: "",
      sortOrder: 0,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      deletedAt: null,
      thumbnailUrl: "",
      type: "",
      typeTranslation: "",
      cityName: "",
      countryName: "",
      countryFlag: "",
    });
  }
}

export const BannerItemClass: HomeItemClass = BannerItem;

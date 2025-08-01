import HomeItem, { HomeItemClass } from "./HomeItem";

export default class CountryItem extends HomeItem {
  constructor({
    id,
    uuid,
    viatorDestinationId,
    continentId,
    subContinentName,
    title,
    description,
    curationTitle,
    iconUrl,
    bigImageUrl,
    imageUrl,
    thumbnailImageUrl,
    isHot,
    latitude,
    longitude,
    timeZone,
    views,
    sortOrder,
    createdAt,
    updatedAt,
    deletedAt,
    enTitle,
    isNew,
    countryName,
    countryFlag,
    attractionsCount,
  }: {
    id: number;
    uuid: string;
    viatorDestinationId: number | null;
    continentId: number;
    subContinentName: string;
    title: string;
    description: string;
    curationTitle: Record<string, string>;
    iconUrl: string;
    bigImageUrl: string;
    imageUrl: string;
    thumbnailImageUrl: string;
    isHot: boolean;
    latitude: string;
    longitude: string;
    timeZone: string;
    views: number;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    enTitle: string;
    isNew: boolean;
    countryName: string;
    countryFlag: string;
    attractionsCount: number;
  }) {
    super();
    this.id = id;
    this.uuid = uuid;
    this.viatorDestinationId = viatorDestinationId;
    this.continentId = continentId;
    this.subContinentName = subContinentName;
    this.title = title;
    this.description = description;
    this.curationTitle = curationTitle;
    this.iconUrl = iconUrl;
    this.bigImageUrl = bigImageUrl;
    this.imageUrl = imageUrl;
    this.thumbnailImageUrl = thumbnailImageUrl;
    this.isHot = isHot;
    this.latitude = latitude;
    this.longitude = longitude;
    this.timeZone = timeZone;
    this.views = views;
    this.sortOrder = sortOrder;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.enTitle = enTitle;
    this.isNew = isNew;
    this.countryName = countryName;
    this.countryFlag = countryFlag;
    this.attractionsCount = attractionsCount;
  }

  id: number;
  uuid: string;
  viatorDestinationId: number | null;
  continentId: number;
  subContinentName: string;
  title: string;
  description: string;
  curationTitle: Record<string, string>;
  iconUrl: string;
  bigImageUrl: string;
  imageUrl: string;
  thumbnailImageUrl: string;
  isHot: boolean;
  latitude: string;
  longitude: string;
  timeZone: string;
  views: number;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  enTitle: string;
  isNew: boolean;
  countryName: string;
  countryFlag: string;
  attractionsCount: number;

  static fromJson(json: Record<string, any>): CountryItem {
    return new CountryItem({
      id: json.id,
      uuid: json.uuid,
      viatorDestinationId: json.viator_destination_id,
      continentId: json.continent_id,
      subContinentName: json.sub_continent_name,
      title: json.title,
      description: json.description,
      curationTitle: json.curation_title ?? {},
      iconUrl: json.icon_url,
      bigImageUrl: json.big_image_url,
      imageUrl: json.image_url,
      thumbnailImageUrl: json.thumbnail_image_url,
      isHot: json.is_hot,
      latitude: json.latitude,
      longitude: json.longitude,
      timeZone: json.time_zone,
      views: json.views,
      sortOrder: json.sort_order,
      createdAt: new Date(json.created_at),
      updatedAt: new Date(json.updated_at),
      deletedAt: json.deleted_at ? new Date(json.deleted_at) : null,
      enTitle: json.en_title,
      isNew: json.is_new,
      countryName: json.country_name,
      countryFlag: json.country_flag,
      attractionsCount: json.attractions_count,
    });
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      uuid: this.uuid,
      viator_destination_id: this.viatorDestinationId,
      continent_id: this.continentId,
      sub_continent_name: this.subContinentName,
      title: this.title,
      description: this.description,
      curation_title: this.curationTitle,
      icon_url: this.iconUrl,
      big_image_url: this.bigImageUrl,
      image_url: this.imageUrl,
      thumbnail_image_url: this.thumbnailImageUrl,
      is_hot: this.isHot,
      latitude: this.latitude,
      longitude: this.longitude,
      time_zone: this.timeZone,
      views: this.views,
      sort_order: this.sortOrder,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
      en_title: this.enTitle,
      is_new: this.isNew,
      country_name: this.countryName,
      country_flag: this.countryFlag,
      attractions_count: this.attractionsCount,
    };
  }

  static empty(): CountryItem {
    return new CountryItem({
      id: 0,
      uuid: "",
      viatorDestinationId: null,
      continentId: 0,
      subContinentName: "",
      title: "",
      description: "",
      curationTitle: {},
      iconUrl: "",
      bigImageUrl: "",
      imageUrl: "",
      thumbnailImageUrl: "",
      isHot: false,
      latitude: "",
      longitude: "",
      timeZone: "",
      views: 0,
      sortOrder: 0,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      deletedAt: null,
      enTitle: "",
      isNew: false,
      countryName: "",
      countryFlag: "",
      attractionsCount: 0,
    });
  }
}

export const CountryItemClass: HomeItemClass = CountryItem;

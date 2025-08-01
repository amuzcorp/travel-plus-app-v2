import HomeItem, { HomeItemClass } from "../HomeSection/HomeItem";

// video, panorama, image
export default class ContentItem extends HomeItem {
  constructor({
    id,
    uuid,
    categoryId,
    title,
    subTitle,
    description,
    provider,
    isHot,
    isNew,
    is4k,
    isFeatured,
    imageUrl,
    featuredImageUrl,
    isActive,
    latitude,
    longitude,
    address,
    thumbnail,
    videoUrl,
    captionUrl,
    panoramaUrl,
    views,
    sortOrder,
    createdAt,
    updatedAt,
    cityName,
    countryName,
    type,
    typeTranslation,
    countryFlag,
    continentName,
  }: {
    id: number;
    uuid: string;
    categoryId: number;
    title: string;
    subTitle: string;
    description: string;
    provider: string | null;
    isHot: boolean;
    isNew: boolean;
    is4k: boolean;
    isFeatured: boolean;
    imageUrl: string | null;
    featuredImageUrl: string | null;
    isActive: boolean;
    latitude: string | null;
    longitude: string | null;
    address: string;
    thumbnail: string;
    videoUrl: string;
    captionUrl: string | null;
    panoramaUrl: string | null;
    views: number;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    cityName: string;
    countryName: string;
    type: string;
    typeTranslation: string;
    countryFlag: string;
    continentName: string;
  }) {
    super();
    this.id = id;
    this.uuid = uuid;
    this.categoryId = categoryId;
    this.title = title;
    this.subTitle = subTitle;
    this.description = description;
    this.provider = provider;
    this.isHot = isHot;
    this.isNew = isNew;
    this.is4k = is4k;
    this.isFeatured = isFeatured;
    this.imageUrl = imageUrl;
    this.featuredImageUrl = featuredImageUrl;
    this.isActive = isActive;
    this.latitude = latitude;
    this.longitude = longitude;
    this.address = address;
    this.thumbnail = thumbnail;
    this.videoUrl = videoUrl;
    this.captionUrl = captionUrl;
    this.panoramaUrl = panoramaUrl;
    this.views = views;
    this.sortOrder = sortOrder;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.cityName = cityName;
    this.countryName = countryName;
    this.type = type;
    this.typeTranslation = typeTranslation;
    this.countryFlag = countryFlag;
    this.continentName = continentName;
  }

  id: number;
  uuid: string;
  categoryId: number;
  title: string;
  subTitle: string;
  description: string;
  provider: string | null;
  isHot: boolean;
  isNew: boolean;
  is4k: boolean;
  isFeatured: boolean;
  imageUrl: string | null;
  featuredImageUrl: string | null;
  isActive: boolean;
  latitude: string | null;
  longitude: string | null;
  address: string;
  thumbnail: string;
  videoUrl: string;
  captionUrl: string | null;
  panoramaUrl: string | null;
  views: number;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  cityName: string;
  countryName: string;
  type: string;
  typeTranslation: string;
  countryFlag: string;
  continentName: string;

  static fromJson(json: Record<string, any>): ContentItem {
    return new ContentItem({
      id: json.id,
      uuid: json.uuid,
      categoryId: json.category_id,
      title: json.title,
      subTitle: json.sub_title,
      description: json.description,
      provider: json.provider,
      isHot: json.is_hot,
      isNew: json.is_new,
      is4k: json.is_4k,
      isFeatured: json.is_featured,
      imageUrl: json.image_url,
      featuredImageUrl: json.featured_image_url,
      isActive: json.is_active,
      latitude: json.latitude,
      longitude: json.longitude,
      address: json.address,
      thumbnail: json.thumbnail,
      videoUrl: json.video_url,
      captionUrl: json.caption_url,
      panoramaUrl: json.panorama_url,
      views: json.views,
      sortOrder: json.sort_order,
      createdAt: new Date(json.created_at),
      updatedAt: new Date(json.updated_at),
      cityName: json.city_name,
      countryName: json.country_name,
      type: json.type,
      typeTranslation: json.type_translation,
      countryFlag: json.country_flag,
      continentName: json.continent_name,
    });
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      uuid: this.uuid,
      category_id: this.categoryId,
      title: this.title,
      sub_title: this.subTitle,
      description: this.description,
      provider: this.provider,
      is_hot: this.isHot,
      is_new: this.isNew,
      is_4k: this.is4k,
      is_featured: this.isFeatured,
      image_url: this.imageUrl,
      featured_image_url: this.featuredImageUrl,
      is_active: this.isActive,
      latitude: this.latitude,
      longitude: this.longitude,
      address: this.address,
      thumbnail: this.thumbnail,
      video_url: this.videoUrl,
      caption_url: this.captionUrl,
      panorama_url: this.panoramaUrl,
      views: this.views,
      sort_order: this.sortOrder,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      city_name: this.cityName,
      country_name: this.countryName,
      type: this.type,
      type_translation: this.typeTranslation,
      country_flag: this.countryFlag,
      continent_name: this.continentName,
    };
  }

  static empty(): ContentItem {
    return new ContentItem({
      id: 0,
      uuid: "",
      categoryId: 0,
      title: "",
      subTitle: "",
      description: "",
      provider: null,
      isHot: false,
      isNew: false,
      is4k: false,
      isFeatured: false,
      imageUrl: null,
      featuredImageUrl: null,
      isActive: false,
      latitude: null,
      longitude: null,
      address: "",
      thumbnail: "",
      videoUrl: "",
      captionUrl: null,
      panoramaUrl: null,
      views: 0,
      sortOrder: 0,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      cityName: "",
      countryName: "",
      type: "",
      typeTranslation: "",
      countryFlag: "",
      continentName: "",
    });
  }
}

export const ContentItemClass: HomeItemClass = ContentItem;

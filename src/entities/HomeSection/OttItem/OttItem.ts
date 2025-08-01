import HomeItem, { HomeItemClass } from "../HomeItem";
import { FilmProvider } from "./FilmProvider";

export default class OttItem extends HomeItem {
  constructor({
    id,
    uuid,
    title,
    description,
    views,
    thumbnail,
    sortOrder,
    createdAt,
    updatedAt,
    deletedAt,
    continentId,
    categoryId,
    is4k,
    isHot,
    teaserVideoUrl,
    posterUrl,
    backgroundUrl,
    blurredImage,
    blurredImageUrl,
    blurRegionData,
    type,
    isNew,
    countryName,
    staticMapUrl,
    filmProviders,
  }: {
    id: number;
    uuid: string;
    title: string;
    description: string;
    views: number;
    thumbnail: string;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    continentId: number | null;
    categoryId: number;
    is4k: boolean;
    isHot: boolean;
    teaserVideoUrl: string;
    posterUrl: string;
    backgroundUrl: string;
    blurredImage: string | null;
    blurredImageUrl: string | null;
    blurRegionData: any;
    type: string;
    isNew: boolean;
    countryName: string;
    staticMapUrl: string;
    filmProviders: FilmProvider[];
  }) {
    super();
    this.id = id;
    this.uuid = uuid;
    this.title = title;
    this.description = description;
    this.views = views;
    this.thumbnail = thumbnail;
    this.sortOrder = sortOrder;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.continentId = continentId;
    this.categoryId = categoryId;
    this.is4k = is4k;
    this.isHot = isHot;
    this.teaserVideoUrl = teaserVideoUrl;
    this.posterUrl = posterUrl;
    this.backgroundUrl = backgroundUrl;
    this.blurredImage = blurredImage;
    this.blurredImageUrl = blurredImageUrl;
    this.blurRegionData = blurRegionData;
    this.type = type;
    this.isNew = isNew;
    this.countryName = countryName;
    this.staticMapUrl = staticMapUrl;
    this.filmProviders = filmProviders;
  }

  id: number;
  uuid: string;
  title: string;
  description: string;
  views: number;
  thumbnail: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  continentId: number | null;
  categoryId: number;
  is4k: boolean;
  isHot: boolean;
  teaserVideoUrl: string;
  posterUrl: string;
  backgroundUrl: string;
  blurredImage: string | null;
  blurredImageUrl: string | null;
  blurRegionData: any;
  type: string;
  isNew: boolean;
  countryName: string;
  staticMapUrl: string;
  filmProviders: FilmProvider[];

  static fromJson(json: Record<string, any>): OttItem {
    return new OttItem({
      id: json.id,
      uuid: json.uuid,
      title: json.title,
      description: json.description,
      views: json.views,
      thumbnail: json.thumbnail,
      sortOrder: json.sort_order,
      createdAt: new Date(json.created_at),
      updatedAt: new Date(json.updated_at),
      deletedAt: json.deleted_at ? new Date(json.deleted_at) : null,
      continentId: json.continent_id,
      categoryId: json.category_id,
      is4k: json.is_4k,
      isHot: json.is_hot,
      teaserVideoUrl: json.teaser_video_url,
      posterUrl: json.poster_url,
      backgroundUrl: json.background_url,
      blurredImage: json.blurred_image,
      blurredImageUrl: json.blurred_image_url,
      blurRegionData: json.blur_region_data ?? null,
      type: json.type,
      isNew: json.is_new,
      countryName: json.country_name,
      staticMapUrl: json.static_map_url,
      filmProviders: (json.film_providers || []).map(FilmProvider.fromJson),
    });
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      uuid: this.uuid,
      title: this.title,
      description: this.description,
      views: this.views,
      thumbnail: this.thumbnail,
      sort_order: this.sortOrder,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
      continent_id: this.continentId,
      category_id: this.categoryId,
      is_4k: this.is4k,
      is_hot: this.isHot,
      teaser_video_url: this.teaserVideoUrl,
      poster_url: this.posterUrl,
      background_url: this.backgroundUrl,
      blurred_image: this.blurredImage,
      blurred_image_url: this.blurredImageUrl,
      blur_region_data: this.blurRegionData,
      type: this.type,
      is_new: this.isNew,
      country_name: this.countryName,
      static_map_url: this.staticMapUrl,
      film_providers: this.filmProviders.map((fp) => ({
        provider: fp.provider,
        icon: fp.icon,
        app_scheme: fp.appScheme,
      })),
    };
  }

  static empty(): OttItem {
    return new OttItem({
      id: 0,
      uuid: "",
      title: "",
      description: "",
      views: 0,
      thumbnail: "",
      sortOrder: 0,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      deletedAt: null,
      continentId: null,
      categoryId: 0,
      is4k: false,
      isHot: false,
      teaserVideoUrl: "",
      posterUrl: "",
      backgroundUrl: "",
      blurredImage: null,
      blurredImageUrl: null,
      blurRegionData: null,
      type: "",
      isNew: false,
      countryName: "",
      staticMapUrl: "",
      filmProviders: [],
    });
  }
}

export const OttItemClass: HomeItemClass = OttItem;

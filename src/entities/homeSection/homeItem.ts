export default class HomeItem {
  constructor({
    id,
    uuid,
    viatorCountryId,
    viatorDestinationId,
    countryId,
    title,
    enTitle,
    description,
    thumbnailImageUrl,
    imageUrl,
    blurredImage,
    blurredImageUrl,
    blurRegionData,
    staticMapUrl,
    bannerMapUrl,
    ottCardMapUrl,
    isHot,
    isNew,
    latitude,
    longitude,
    bestTravelStartMonth,
    bestTravelEndMonth,
    bestTravelTimeText,
    views,
    sortOrder,
    createdAt,
    updatedAt,
    deletedAt,
    imageUrlFull,
    countryName,
    countryFlag,
    continentName,
    attractionsCount,
  }: {
    id: number;
    uuid: string;
    viatorCountryId: number | null;
    viatorDestinationId: number | null;
    countryId: number;
    title: string;
    enTitle: string;
    description: string;
    thumbnailImageUrl: string;
    imageUrl: string;
    blurredImage: string;
    blurredImageUrl: string;
    blurRegionData: Record<string, any>;
    staticMapUrl: string;
    bannerMapUrl: string;
    ottCardMapUrl: string;
    isHot: boolean;
    isNew: boolean;
    latitude: string;
    longitude: string;
    bestTravelStartMonth: number;
    bestTravelEndMonth: number;
    bestTravelTimeText: string;
    views: number;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    imageUrlFull: string;
    countryName: string;
    countryFlag: string;
    continentName: string;
    attractionsCount: number;
  }) {
    this.id = id;
    this.uuid = uuid;
    this.viatorCountryId = viatorCountryId;
    this.viatorDestinationId = viatorDestinationId;
    this.countryId = countryId;
    this.title = title;
    this.enTitle = enTitle;
    this.description = description;
    this.thumbnailImageUrl = thumbnailImageUrl;
    this.imageUrl = imageUrl;
    this.blurredImage = blurredImage;
    this.blurredImageUrl = blurredImageUrl;
    this.blurRegionData = blurRegionData;
    this.staticMapUrl = staticMapUrl;
    this.bannerMapUrl = bannerMapUrl;
    this.ottCardMapUrl = ottCardMapUrl;
    this.isHot = isHot;
    this.isNew = isNew;
    this.latitude = latitude;
    this.longitude = longitude;
    this.bestTravelStartMonth = bestTravelStartMonth;
    this.bestTravelEndMonth = bestTravelEndMonth;
    this.bestTravelTimeText = bestTravelTimeText;
    this.views = views;
    this.sortOrder = sortOrder;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.imageUrlFull = imageUrlFull;
    this.countryName = countryName;
    this.countryFlag = countryFlag;
    this.continentName = continentName;
    this.attractionsCount = attractionsCount;
  }

  id: number;
  uuid: string;
  viatorCountryId: number | null;
  viatorDestinationId: number | null;
  countryId: number;
  title: string;
  enTitle: string;
  description: string;
  thumbnailImageUrl: string;
  imageUrl: string;
  blurredImage: string;
  blurredImageUrl: string;
  blurRegionData: Record<string, any>;
  staticMapUrl: string;
  bannerMapUrl: string;
  ottCardMapUrl: string;
  isHot: boolean;
  isNew: boolean;
  latitude: string;
  longitude: string;
  bestTravelStartMonth: number;
  bestTravelEndMonth: number;
  bestTravelTimeText: string;
  views: number;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  imageUrlFull: string;
  countryName: string;
  countryFlag: string;
  continentName: string;
  attractionsCount: number;

  static fromJson(json: Record<string, any>): HomeItem {
    return new HomeItem({
      id: json.id,
      uuid: json.uuid,
      viatorCountryId: json.viator_country_id,
      viatorDestinationId: json.viator_destination_id,
      countryId: json.country_id,
      title: json.title,
      enTitle: json.en_title,
      description: json.description,
      thumbnailImageUrl: json.thumbnail_image_url,
      imageUrl: json.image_url,
      blurredImage: json.blurred_image,
      blurredImageUrl: json.blurred_image_url,
      blurRegionData: json.blur_region_data ?? {},
      staticMapUrl: json.static_map_url,
      bannerMapUrl: json.banner_map_url,
      ottCardMapUrl: json.ott_card_map_url,
      isHot: json.is_hot,
      isNew: json.is_new,
      latitude: json.latitude,
      longitude: json.longitude,
      bestTravelStartMonth: json.best_travel_start_month,
      bestTravelEndMonth: json.best_travel_end_month,
      bestTravelTimeText: json.best_travel_time_text,
      views: json.views,
      sortOrder: json.sort_order,
      createdAt: new Date(json.created_at),
      updatedAt: new Date(json.updated_at),
      deletedAt: json.deleted_at ? new Date(json.deleted_at) : null,
      imageUrlFull: json.image_url_full,
      countryName: json.country_name,
      countryFlag: json.country_flag,
      continentName: json.continent_name,
      attractionsCount: json.attractions_count,
    });
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      uuid: this.uuid,
      viator_country_id: this.viatorCountryId,
      viator_destination_id: this.viatorDestinationId,
      country_id: this.countryId,
      title: this.title,
      en_title: this.enTitle,
      description: this.description,
      thumbnail_image_url: this.thumbnailImageUrl,
      image_url: this.imageUrl,
      blurred_image: this.blurredImage,
      blurred_image_url: this.blurredImageUrl,
      blur_region_data: this.blurRegionData,
      static_map_url: this.staticMapUrl,
      banner_map_url: this.bannerMapUrl,
      ott_card_map_url: this.ottCardMapUrl,
      is_hot: this.isHot,
      is_new: this.isNew,
      latitude: this.latitude,
      longitude: this.longitude,
      best_travel_start_month: this.bestTravelStartMonth,
      best_travel_end_month: this.bestTravelEndMonth,
      best_travel_time_text: this.bestTravelTimeText,
      views: this.views,
      sort_order: this.sortOrder,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
      image_url_full: this.imageUrlFull,
      country_name: this.countryName,
      country_flag: this.countryFlag,
      continent_name: this.continentName,
      attractions_count: this.attractionsCount,
    };
  }

  static empty(): HomeItem {
    return new HomeItem({
      id: 0,
      uuid: "",
      viatorCountryId: null,
      viatorDestinationId: null,
      countryId: 0,
      title: "",
      enTitle: "",
      description: "",
      thumbnailImageUrl: "",
      imageUrl: "",
      blurredImage: "",
      blurredImageUrl: "",
      blurRegionData: {},
      staticMapUrl: "",
      bannerMapUrl: "",
      ottCardMapUrl: "",
      isHot: false,
      isNew: false,
      latitude: "",
      longitude: "",
      bestTravelStartMonth: 0,
      bestTravelEndMonth: 0,
      bestTravelTimeText: "",
      views: 0,
      sortOrder: 0,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      deletedAt: null,
      imageUrlFull: "",
      countryName: "",
      countryFlag: "",
      continentName: "",
      attractionsCount: 0,
    });
  }
}

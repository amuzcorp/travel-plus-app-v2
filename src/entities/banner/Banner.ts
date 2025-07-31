export class Banner {
  id?: number;
  uuid?: string;
  cityId?: number;
  title?: string;
  description?: string;
  categoryId?: number;
  is4k?: boolean;
  staticMapUrl?: string;
  videoUrl?: string;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  thumbnailUrl?: string | null;
  type?: string;
  typeTranslation?: string;
  cityName?: string;
  countryName?: string;
  countryFlag?: string;
  // category?: any;

  constructor(data: Partial<Banner>) {
    this.id = data.id;
    this.uuid = data.uuid;
    this.cityId = data.cityId;
    this.title = data.title;
    this.description = data.description;
    this.categoryId = data.categoryId;
    this.is4k = data.is4k;
    this.staticMapUrl = data.staticMapUrl;
    this.videoUrl = data.videoUrl;
    this.sortOrder = data.sortOrder;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
    this.thumbnailUrl = data.thumbnailUrl;
    this.type = data.type;
    // this.category = data.category;
    this.typeTranslation = data.typeTranslation;
    this.cityName = data.cityName;
    this.countryName = data.countryName;
    this.countryFlag = data.countryFlag;
  }

  // 서버 응답 → Account 인스턴스
  static fromJson(json: any): Banner {
    return new Banner({
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
      createdAt: json.created_at,
      updatedAt: json.updated_at,
      deletedAt: json.deleted_at,
      thumbnailUrl: json.thumbnail_url,
      type: json.type,
      // category: json.category,
      typeTranslation: json.type_translation,
      cityName: json.city_name,
      countryName: json.country_name,
      countryFlag: json.country_flag,
    });
  }

  // 서버 전송용 JSON
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
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      deleted_at: this.deletedAt,
      thumbnail_url: this.thumbnailUrl,
      type: this.type,
      // category: this.category,
      type_translation: this.typeTranslation,
      city_name: this.cityName,
      country_name: this.countryName,
      country_flag: this.countryFlag,
    };
  }

  // Redux 저장용 JSON
  toReduxState(): Record<string, any> {
    return {
      id: this.id,
      uuid: this.uuid,
      cityId: this.cityId,
      title: this.title,
      description: this.description,
      categoryId: this.categoryId,
      is4k: this.is4k,
      staticMapUrl: this.staticMapUrl,
      videoUrl: this.videoUrl,
      sortOrder: this.sortOrder,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      thumbnailUrl: this.thumbnailUrl,
      type: this.type,
      // category: this.category,
      typeTranslation: this.typeTranslation,
      cityName: this.cityName,
      countryName: this.countryName,
      countryFlag: this.countryFlag,
    };
  }

  //  Redux 복원
  static fromReduxState(state: any): Banner {
    return new Banner({ ...state });
  }
}

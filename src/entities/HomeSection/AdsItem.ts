import HomeItem, { HomeItemClass } from "./HomeItem";

export default class AdsItem extends HomeItem {
  constructor({
    id,
    imageUrl,
    videoUrl,
    hasDiscoverNow,
    hasWatchVideo,
    qrImageUrl,
    providerImageUrl,
    linkUrl,
    startedAt,
    endedAt,
    sortOrder,
    isActive,
    createdAt,
    updatedAt,
  }: {
    id: number;
    imageUrl: string;
    videoUrl: string;
    hasDiscoverNow: boolean;
    hasWatchVideo: boolean;
    qrImageUrl: string;
    providerImageUrl: string;
    linkUrl: string;
    startedAt: Date;
    endedAt: Date;
    sortOrder: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super();
    this.id = id;
    this.imageUrl = imageUrl;
    this.videoUrl = videoUrl;
    this.hasDiscoverNow = hasDiscoverNow;
    this.hasWatchVideo = hasWatchVideo;
    this.qrImageUrl = qrImageUrl;
    this.providerImageUrl = providerImageUrl;
    this.linkUrl = linkUrl;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.sortOrder = sortOrder;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  id: number;
  imageUrl: string;
  videoUrl: string;
  hasDiscoverNow: boolean;
  hasWatchVideo: boolean;
  qrImageUrl: string;
  providerImageUrl: string;
  linkUrl: string;
  startedAt: Date;
  endedAt: Date;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  static fromJson(json: Record<string, any>): AdsItem {
    return new AdsItem({
      id: json.id,
      imageUrl: json.image_url,
      videoUrl: json.video_url,
      hasDiscoverNow: json.has_discover_now,
      hasWatchVideo: json.has_watch_video,
      qrImageUrl: json.qr_image_url,
      providerImageUrl: json.provider_image_url,
      linkUrl: json.link_url,
      startedAt: new Date(json.started_at),
      endedAt: new Date(json.ended_at),
      sortOrder: json.sort_order,
      isActive: json.is_active,
      createdAt: new Date(json.created_at),
      updatedAt: new Date(json.updated_at),
    });
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      image_url: this.imageUrl,
      video_url: this.videoUrl,
      has_discover_now: this.hasDiscoverNow,
      has_watch_video: this.hasWatchVideo,
      qr_image_url: this.qrImageUrl,
      provider_image_url: this.providerImageUrl,
      link_url: this.linkUrl,
      started_at: this.startedAt.toISOString(),
      ended_at: this.endedAt.toISOString(),
      sort_order: this.sortOrder,
      is_active: this.isActive,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
    };
  }

  static empty(): AdsItem {
    return new AdsItem({
      id: 0,
      imageUrl: "",
      videoUrl: "",
      hasDiscoverNow: false,
      hasWatchVideo: false,
      qrImageUrl: "",
      providerImageUrl: "",
      linkUrl: "",
      startedAt: new Date(0),
      endedAt: new Date(0),
      sortOrder: 0,
      isActive: false,
      createdAt: new Date(0),
      updatedAt: new Date(0),
    });
  }
}

export const AdsItemClass: HomeItemClass = AdsItem;

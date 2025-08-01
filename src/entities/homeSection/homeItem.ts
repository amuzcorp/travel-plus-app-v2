export interface HomeItemClass {
  fromJson(json: Record<string, any>): HomeItem;
  empty(): HomeItem;
}

export default abstract class HomeItem {
  abstract toJson(): Record<string, any>;

  static getFromJson<T extends keyof typeof HomeItem.registry>(
    type: T,
    json: Record<string, any>
  ): HomeItem {
    const clazz = HomeItem.registry[type];

    return clazz.fromJson(json);
  }

  private static registry: Record<string, HomeItemClass> = {};

  static register(type: string, clazz: HomeItemClass) {
    HomeItem.registry[type] = clazz;
  }
}

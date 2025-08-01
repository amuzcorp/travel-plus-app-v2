export class FilmProvider {
  provider: string;
  icon: string;
  appScheme: string;

  constructor(provider: string, icon: string, appScheme: string) {
    this.provider = provider;
    this.icon = icon;
    this.appScheme = appScheme;
  }

  static fromJson(data: any): FilmProvider {
    return new FilmProvider(data.provider, data.icon, data.app_scheme);
  }
}

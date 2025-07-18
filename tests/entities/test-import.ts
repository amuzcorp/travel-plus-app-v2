// 모든 엔티티 import 테스트
import {
  BaseEntity,
  Continent,
  MultiLanguageText,
  Country,
  City,
  BlurRegionData,
  Destination,
  AttractionCategory,
  Attraction,
  Film,
  Curation,
  CurationItem,
  FilmingLocation,
  EmpUser,
  UserMetadata,
  User,
  Device,
  UserAccount,
  UserLuggage,
  UserViewedItem,
  AttractionViewHistory,
  CityViewHistory,
  CountryViewHistory,
  FilmViewHistory,
  HotTagCoolDown,
  CityHotTagCoolDown,
  CountryHotTagCoolDown,
  SearchedKeyword,
  SearchKeyword,
  EmpUserNotification,
  Role,
  RoleUser,
  FilmProvider,
  CityFilm,
  CountryCuration,
  Document,
  DocumentContent
} from '../../src/entities';

// 엔티티 인스턴스 생성 테스트
const testEntities = {
  continent: new Continent(),
  country: new Country(),
  city: new City(),
  attraction: new Attraction(),
  empUser: new EmpUser(),
  film: new Film(),
  curation: new Curation()
};

console.log('✅ 모든 엔티티가 정상적으로 import되었습니다!');
console.log('생성된 테스트 인스턴스:', Object.keys(testEntities));

export default testEntities; 
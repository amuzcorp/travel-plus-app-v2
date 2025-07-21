import {
  Continent,
  Country,
  City,
  Attraction,
  EmpUser,
  MultiLanguageText
} from '../../src/entities';

// 엔티티 사용 예제
export class EntityUsageExample {
  
  // 대륙 생성 예제
  static createContinent(): Continent {
    return {
      id: 1,
      uuid: 'continent-asia-uuid',
      title: { ko: '아시아', en: 'Asia', de: 'Asien' },
      description: { ko: '아시아 대륙', en: 'Asian continent' },
      icon: 'asia-icon.png',
      sortOrder: 1
    } as Continent;
  }

  // 국가 생성 예제
  static createCountry(): Country {
    return {
      id: 1,
      uuid: 'country-korea-uuid',
      continentId: 1,
      title: { ko: '대한민국', en: 'South Korea', de: 'Südkorea' },
      description: { ko: '한반도 남부에 위치한 국가', en: 'Country located in southern Korean peninsula' },
      isHot: true,
      views: 1000,
      sortOrder: 1
    } as Country;
  }

  // 도시 생성 예제
  static createCity(): City {
    return {
      id: 1,
      uuid: 'city-seoul-uuid',
      countryId: 1,
      title: { ko: '서울', en: 'Seoul', de: 'Seoul' },
      description: { ko: '대한민국의 수도', en: 'Capital of South Korea' },
      isHot: true,
      views: 5000,
      sortOrder: 1,
      latitude: 37.5665,
      longitude: 126.9780
    } as City;
  }

  // 관광지 생성 예제
  static createAttraction(): Attraction {
    return {
      id: 1,
      uuid: 'attraction-gyeongbokgung-uuid',
      cityId: 1,
      categoryId: 1,
      title: { ko: '경복궁', en: 'Gyeongbokgung Palace', de: 'Gyeongbokgung-Palast' },
      subTitle: { ko: '조선왕조의 정궁', en: 'Main palace of Joseon Dynasty' },
      description: { ko: '조선왕조의 정궁으로 1395년에 건립', en: 'Main palace of Joseon Dynasty built in 1395' },
      isHot: true,
      is4k: true,
      isFeatured: true,
      isActive: true,
      views: 15000,
      sortOrder: 1,
      latitude: 37.5796,
      longitude: 126.9770,
      address: { ko: '서울특별시 종로구 사직로 161', en: '161 Sajik-ro, Jongno-gu, Seoul' },
      imageUrl: 'https://example.com/gyeongbokgung.jpg',
      videoUrl: 'https://example.com/gyeongbokgung.mp4'
    } as Attraction;
  }

  // LG 임직원 사용자 생성 예제
  static createEmpUser(): EmpUser {
    return {
      id: 1,
      uuid: 'emp-user-uuid',
      empNumber: 'KR2507048129312',
      name: '홍길동',
      metadata: {
        department: 'IT',
        location: 'Seoul',
        preferences: {
          language: 'ko',
          notifications: true
        }
      }
    } as EmpUser;
  }

  // 다국어 텍스트 생성 예제
  static createMultiLanguageText(): MultiLanguageText {
    return {
      ko: '안녕하세요',
      en: 'Hello',
      de: 'Hallo',
      ru: 'Привет'
    };
  }

  // 전체 예제 실행
  static runExamples() {
    console.log('🏗️ 엔티티 사용 예제:');
    
    const continent = this.createContinent();
    const country = this.createCountry();
    const city = this.createCity();
    const attraction = this.createAttraction();
    const empUser = this.createEmpUser();
    const multiLangText = this.createMultiLanguageText();

    console.log('✅ 대륙:', continent.title);
    console.log('✅ 국가:', country.title);
    console.log('✅ 도시:', city.title);
    console.log('✅ 관광지:', attraction.title);
    console.log('✅ 임직원:', empUser.name);
    console.log('✅ 다국어:', multiLangText);

    return {
      continent,
      country,
      city,
      attraction,
      empUser,
      multiLangText
    };
  }
}

// 예제 실행
EntityUsageExample.runExamples(); 
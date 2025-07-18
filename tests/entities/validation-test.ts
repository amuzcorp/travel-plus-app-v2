import {
  Continent,
  Country,
  City,
  Attraction,
  EmpUser,
  MultiLanguageText
} from '../../src/entities';

// 엔티티 구조 검증 함수들
export class EntityValidator {
  
  // 다국어 텍스트 검증
  static validateMultiLanguageText(text: MultiLanguageText): boolean {
    return typeof text === 'object' && 
           !!(text.ko || text.en || text.gb || text.de || text.ru);
  }

  // 필수 필드 검증
  static validateContinent(continent: Continent): boolean {
    return !!(
      continent.id &&
      continent.uuid &&
      continent.title &&
      continent.icon &&
      continent.sortOrder !== undefined
    );
  }

  static validateCountry(country: Country): boolean {
    return !!(
      country.id &&
      country.uuid &&
      country.title &&
      country.sortOrder !== undefined
    );
  }

  static validateCity(city: City): boolean {
    return !!(
      city.id &&
      city.uuid &&
      city.title &&
      city.sortOrder !== undefined
    );
  }

  static validateAttraction(attraction: Attraction): boolean {
    return !!(
      attraction.id &&
      attraction.uuid &&
      attraction.title &&
      attraction.description &&
      attraction.sortOrder !== undefined
    );
  }

  static validateEmpUser(empUser: EmpUser): boolean {
    return !!(
      empUser.id &&
      empUser.uuid &&
      empUser.empNumber
    );
  }

  // 테스트 데이터 생성
  static createTestData() {
    const testContinent = {
      id: 1,
      uuid: 'test-uuid',
      title: { ko: '아시아', en: 'Asia' },
      description: { ko: '아시아 대륙', en: 'Asian continent' },
      icon: 'asia-icon.png',
      sortOrder: 1
    } as Continent;

    const testCountry = {
      id: 1,
      uuid: 'test-uuid',
      title: { ko: '한국', en: 'Korea' },
      description: { ko: '대한민국', en: 'Republic of Korea' },
      isHot: false,
      views: 0,
      sortOrder: 1
    } as Country;

    const testCity = {
      id: 1,
      uuid: 'test-uuid',
      title: { ko: '서울', en: 'Seoul' },
      description: { ko: '대한민국의 수도', en: 'Capital of Korea' },
      isHot: false,
      views: 0,
      sortOrder: 1
    } as City;

    const testAttraction = {
      id: 1,
      uuid: 'test-uuid',
      title: { ko: '경복궁', en: 'Gyeongbokgung' },
      description: { ko: '조선왕조의 정궁', en: 'Main palace of Joseon Dynasty' },
      isHot: false,
      is4k: false,
      isFeatured: false,
      isActive: true,
      views: 0,
      sortOrder: 1
    } as Attraction;

    const testEmpUser = {
      id: 1,
      uuid: 'test-uuid',
      empNumber: 'KR123456789'
    } as EmpUser;

    return {
      testContinent,
      testCountry,
      testCity,
      testAttraction,
      testEmpUser
    };
  }

  // 전체 검증 실행
  static runValidationTests() {
    const testData = this.createTestData();
    
    const results = {
      continent: this.validateContinent(testData.testContinent),
      country: this.validateCountry(testData.testCountry),
      city: this.validateCity(testData.testCity),
      attraction: this.validateAttraction(testData.testAttraction),
      empUser: this.validateEmpUser(testData.testEmpUser),
      multiLanguageText: this.validateMultiLanguageText(testData.testContinent.title)
    };

    console.log('🔍 엔티티 구조 검증 결과:');
    Object.entries(results).forEach(([name, isValid]) => {
      console.log(`${isValid ? '✅' : '❌'} ${name}: ${isValid ? 'PASS' : 'FAIL'}`);
    });

    return results;
  }
}

// 검증 실행
EntityValidator.runValidationTests(); 
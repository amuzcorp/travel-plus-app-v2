# Travel Plus App v2

## 🏗️ 프로젝트 구조

```
src/
├── entities/          # 데이터베이스 엔티티 클래스들
├── components/        # React 컴포넌트들
├── views/            # 페이지 컴포넌트들
├── core/             # 핵심 로직 (라우터, 스토어 등)
└── types/            # TypeScript 타입 정의
```

## 📊 데이터베이스 엔티티 구조

### 지리적 계층 구조
```
continents (대륙)
    ↓
countries (국가)
    ↓
cities (도시)
    ↓
attractions (관광지/명소)
```

### 주요 엔티티 카테고리

#### 🌍 지리적 엔티티 (4개)
- `Continent` - 대륙 정보
- `Country` - 국가 정보  
- `City` - 도시 정보
- `Destination` - Viator API 목적지

#### 🎬 콘텐츠 엔티티 (6개)
- `AttractionCategory` - 관광지 카테고리
- `Attraction` - 관광지/명소 (핵심 콘텐츠)
- `Film` - 영화/비디오 콘텐츠
- `Curation` - 큐레이션
- `CurationItem` - 큐레이션 아이템
- `FilmingLocation` - 촬영지

#### 👥 사용자 엔티티 (6개)
- `EmpUser` - LG 임직원 사용자 (핵심)
- `User` - 일반 사용자
- `Device` - 디바이스 정보
- `UserAccount` - 사용자 계정
- `UserLuggage` - 사용자 여행 가방
- `UserViewedItem` - 사용자 조회 아이템

#### 📈 히스토리 & 통계 엔티티 (7개)
- `AttractionViewHistory` - 관광지 조회 기록
- `CityViewHistory` - 도시 조회 기록
- `CountryViewHistory` - 국가 조회 기록
- `FilmViewHistory` - 영화 조회 기록
- `HotTagCoolDown` - 인기 콘텐츠 쿨다운
- `CityHotTagCoolDown` - 도시별 인기 콘텐츠
- `CountryHotTagCoolDown` - 국가별 인기 콘텐츠

### 기본 Import

```typescript
import {
  Continent,
  Country,
  City,
  Attraction,
  EmpUser,
  MultiLanguageText
} from 'src/entities';
```

# Enact.js 라이브러리 문서 모음

이 저장소는 Enact.js의 모든 라이브러리와 도구들의 문서를 체계적으로 정리한 것입니다.

## 📚 라이브러리 문서

### 1. [Core Library](./core-library/README.md) 🔧
- **개요**: Enact.js 프레임워크의 핵심 기능
- **주요 기능**: Component System, Hooks, Context, Utilities
- **문서**: [시작 가이드](./core-library/getting-started.md) | [API 참조](./core-library/api-reference.md) | [사용 예제](./core-library/examples.md) | [개발자 가이드](./core-library/development.md)

### 2. [i18n Library](./i18n-library/README.md) 🌍
- **개요**: 애플리케이션 국제화(i18n) 지원
- **주요 기능**: 다국어 지원, 동적 언어 변경, 플러럴 폼, 날짜/시간 포맷
- **문서**: [시작 가이드](./i18n-library/getting-started.md) | [API 참조](./i18n-library/api-reference.md) | [사용 예제](./i18n-library/examples.md) | [개발자 가이드](./i18n-library/development.md)

### 3. [Moonstone UI Library](./moonstone-ui-library/README.md) 🎨
- **개요**: LG WebOS 플랫폼을 위한 UI 컴포넌트 라이브러리
- **주요 기능**: TV 최적화 UI, 포커스 관리, 애니메이션, 테마 지원
- **문서**: [시작 가이드](./moonstone-ui-library/getting-started.md) | [API 참조](./moonstone-ui-library/api-reference.md) | [사용 예제](./moonstone-ui-library/examples.md) | [개발자 가이드](./moonstone-ui-library/development.md)

### 4. [Spotlight Library](./spotlight-library/README.md) 🎯
- **개요**: TV 리모컨 네비게이션을 위한 포커스 관리 시스템
- **주요 기능**: 포커스 관리, 스폿라이트 컨테이너, 네비게이션 규칙
- **문서**: [시작 가이드](./spotlight-library/getting-started.md) | [API 참조](./spotlight-library/api-reference.md) | [사용 예제](./spotlight-library/examples.md) | [개발자 가이드](./spotlight-library/development.md)

### 5. [Router Library](./router-library/README.md) 🛣️
- **개요**: 애플리케이션의 라우팅을 관리하는 라이브러리
- **주요 기능**: 라우트 정의, 동적 라우팅, 중첩 라우팅, 라우트 가드
- **문서**: [시작 가이드](./router-library/getting-started.md) | [API 참조](./router-library/api-reference.md) | [사용 예제](./router-library/examples.md) | [개발자 가이드](./router-library/development.md)

### 6. [WebOS Library](./webos-library/README.md) 📺
- **개요**: LG WebOS 플랫폼과의 통합을 지원하는 라이브러리
- **주요 기능**: WebOS API 통합, 앱 생명주기 관리, 시스템 이벤트, 미디어 컨트롤
- **문서**: [시작 가이드](./webos-library/getting-started.md) | [API 참조](./webos-library/api-reference.md) | [사용 예제](./webos-library/examples.md) | [개발자 가이드](./webos-library/development.md)

### 7. [Testing Library](./testing-library/README.md) 🧪
- **개요**: Enact.js 애플리케이션을 위한 테스팅 도구 모음
- **주요 기능**: 단위 테스트, 통합 테스트, E2E 테스트, 스냅샷 테스트
- **문서**: [시작 가이드](./testing-library/getting-started.md) | [API 참조](./testing-library/api-reference.md) | [사용 예제](./testing-library/examples.md) | [개발자 가이드](./testing-library/development.md)

## 🛠️ 개발자 도구

### [개발자 도구](./developer-tools/README.md)
- **CLI 도구**: 프로젝트 생성 및 관리
- **개발 서버**: 핫 리로드 개발 환경
- **빌드 도구**: 프로덕션 빌드
- **디버깅 도구**: 문제 해결 도구
- **성능 분석**: 성능 모니터링
- **코드 생성**: 컴포넌트 템플릿 생성

### [ESLint 가이드](./eslint-guide/README.md)
- **코드 품질 검사**: 잠재적 버그 및 문제점 발견
- **스타일 가이드**: 일관된 코딩 스타일 적용
- **Enact 규칙**: Enact.js 특화 규칙 적용
- **자동 수정**: 자동으로 수정 가능한 문제 해결
- **팀 협업**: 팀 전체의 코드 품질 향상

## 📖 문서 구조

각 라이브러리는 다음과 같은 구조로 정리되어 있습니다:

```
library-name/
├── README.md          # 라이브러리 개요
├── getting-started.md # 시작 가이드
├── api-reference.md   # API 참조
├── examples.md        # 사용 예제
└── development.md     # 개발자 가이드
```

## 🚀 빠른 시작

### 1. 새 프로젝트 생성
```bash
npx create-enact-app my-app
cd my-app
npm start
```

### 2. 라이브러리 설치
```bash
# Core Library
npm install @enact/core

# UI Library
npm install @enact/moonstone

# i18n Library
npm install @enact/i18n

# Spotlight Library
npm install @enact/spotlight

# Router Library
npm install @enact/router

# WebOS Library
npm install @enact/webos

# Testing Library
npm install --save-dev @enact/test-utils
```

### 3. 기본 앱 설정
```jsx
import {MoonstoneDecorator} from '@enact/moonstone/MoonstoneDecorator';
import {SpotlightRootDecorator} from '@enact/spotlight/SpotlightRootDecorator';
import {I18nContextDecorator} from '@enact/i18n';

const App = MoonstoneDecorator(
    {},
    SpotlightRootDecorator(
        {restrict: 'self-only'},
        I18nContextDecorator(
            {locales: ['ko-KR', 'en-US']},
            (AppBase) => {
                return class App extends AppBase {
                    render() {
                        return <div>Hello Enact!</div>;
                    }
                };
            }
        )
    )
);

export default App;
```

## 📋 체크리스트

### 개발 환경 설정
- [ ] Node.js 설치 (v14 이상)
- [ ] npm 또는 yarn 설치
- [ ] VS Code 또는 선호하는 IDE 설치
- [ ] ESLint 확장 프로그램 설치
- [ ] React Developer Tools 설치

### 프로젝트 설정
- [ ] 새 Enact 프로젝트 생성
- [ ] 필요한 라이브러리 설치
- [ ] ESLint 설정
- [ ] Git 저장소 초기화
- [ ] 개발 서버 실행

### 개발 시작
- [ ] 첫 번째 컴포넌트 생성
- [ ] 라우팅 설정
- [ ] i18n 설정
- [ ] 테스트 작성
- [ ] 빌드 및 배포

## 🤝 기여하기

이 문서는 지속적으로 개선되고 있습니다. 기여를 환영합니다!

### 기여 방법
1. 이슈 등록: 버그 리포트, 기능 요청, 문서 개선 제안
2. 풀 리퀘스트: 코드 수정, 문서 추가, 번역
3. 토론 참여: 새로운 아이디어 제안, 질문과 답변

### 문서 작성 가이드
- 명확하고 간결한 설명
- 실제 사용 예제 포함
- 코드 스니펫 제공
- 스크린샷 또는 다이어그램 활용
- 한국어로 작성

## 📞 지원

### 공식 리소스
- [Enact.js 공식 문서](https://enactjs.com/docs/)
- [GitHub 저장소](https://github.com/enactjs/enact)
- [커뮤니티 포럼](https://github.com/enactjs/enact/discussions)

### 문제 해결
- [FAQ](./faq.md)
- [문제 해결 가이드](./troubleshooting.md)
- [성능 최적화](./performance-optimization.md)

## 📄 라이선스

이 문서는 MIT 라이선스 하에 배포됩니다.

---

**마지막 업데이트**: 2024년 12월

**버전**: 1.0.0

**문서 작성자**: Enact.js 커뮤니티 
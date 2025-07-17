# Enact i18n Library

Enact i18n Library는 애플리케이션의 국제화(i18n)를 지원하는 라이브러리입니다.

## 개요

i18n Library는 다음과 같은 기능들을 제공합니다:

- **다국어 지원** - 여러 언어의 텍스트 관리
- **동적 언어 변경** - 런타임 언어 변경
- **플러럴 폼** - 복수형 처리
- **날짜/시간 포맷** - 지역별 날짜/시간 표시
- **숫자 포맷** - 지역별 숫자 표시
- **RTL 지원** - 오른쪽에서 왼쪽으로 쓰는 언어 지원

## 주요 기능

### 1. 다국어 지원

```jsx
import {I18nContextDecorator} from '@enact/i18n';

const App = I18nContextDecorator({
    locales: ['ko-KR', 'en-US', 'ja-JP']
}, (AppBase) => {
    return class App extends AppBase {
        render() {
            return <div>Hello World</div>;
        }
    };
});
```

### 2. 텍스트 리소스 관리

```jsx
// ko-KR.json
{
    "app": {
        "title": "내 애플리케이션",
        "welcome": "환영합니다",
        "buttons": {
            "save": "저장",
            "cancel": "취소"
        }
    }
}

// en-US.json
{
    "app": {
        "title": "My Application",
        "welcome": "Welcome",
        "buttons": {
            "save": "Save",
            "cancel": "Cancel"
        }
    }
}
```

### 3. 동적 언어 변경

```jsx
import {useI18n} from '@enact/i18n';

const LanguageSelector = () => {
    const {locale, setLocale} = useI18n();
    
    return (
        <select value={locale} onChange={(e) => setLocale(e.target.value)}>
            <option value="ko-KR">한국어</option>
            <option value="en-US">English</option>
            <option value="ja-JP">日本語</option>
        </select>
    );
};
```

### 4. 플러럴 폼 지원

```jsx
// ko-KR.json
{
    "items": {
        "one": "{{count}}개의 항목",
        "other": "{{count}}개의 항목들"
    }
}

// 사용법
const ItemCount = () => {
    const {$L} = useI18n();
    
    return (
        <div>
            {$L('items', {count: 1})}  // "1개의 항목"
            {$L('items', {count: 5})}  // "5개의 항목들"
        </div>
    );
};
```

### 5. 날짜/시간 포맷

```jsx
import {useI18n} from '@enact/i18n';

const DateDisplay = () => {
    const {formatDate} = useI18n();
    const date = new Date();
    
    return (
        <div>
            {formatDate(date, {year: 'numeric', month: 'long', day: 'numeric'})}
        </div>
    );
};
```

### 6. 숫자 포맷

```jsx
import {useI18n} from '@enact/i18n';

const NumberDisplay = () => {
    const {formatNumber} = useI18n();
    
    return (
        <div>
            {formatNumber(1234.56)}  // 한국어: 1,234.56, 영어: 1,234.56
        </div>
    );
};
```

## 설치

```bash
npm install @enact/i18n
```

## 기본 설정

### 1. 앱 설정

```jsx
import {I18nContextDecorator} from '@enact/i18n';

const App = I18nContextDecorator({
    locales: ['ko-KR', 'en-US'],
    defaultLocale: 'ko-KR',
    resource: {
        'ko-KR': require('./locales/ko-KR.json'),
        'en-US': require('./locales/en-US.json')
    }
}, (AppBase) => {
    return class App extends AppBase {
        render() {
            return <div>My App</div>;
        }
    };
});

export default App;
```

### 2. 리소스 파일 구조

```
src/
├── locales/
│   ├── ko-KR.json
│   ├── en-US.json
│   └── ja-JP.json
└── App.js
```

## 📚 관련 문서

- [시작 가이드](./getting-started.md)
- [API 참조](./api-reference.md)
- [사용 예제](./examples.md)
- [개발자 가이드](./development.md)

## 🔗 다른 라이브러리

- [Core Library](../core-library/README.md) - 핵심 기능
- [Moonstone UI Library](../moonstone-ui-library/README.md) - UI 컴포넌트
- [Spotlight Library](../spotlight-library/README.md) - 포커스 관리
- [Router Library](../router-library/README.md) - 라우팅
- [WebOS Library](../webos-library/README.md) - WebOS 통합
- [Testing Library](../testing-library/README.md) - 테스팅 도구

## 🏠 [메인 문서로 돌아가기](../README.md) 
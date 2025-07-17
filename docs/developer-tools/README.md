# Enact 개발자 도구

Enact.js 개발을 위한 다양한 개발자 도구들을 소개합니다.

## 개요

Enact 개발자 도구는 다음과 같은 기능들을 제공합니다:

- **CLI 도구** - 프로젝트 생성 및 관리
- **개발 서버** - 핫 리로드 개발 환경
- **빌드 도구** - 프로덕션 빌드
- **디버깅 도구** - 문제 해결 도구
- **성능 분석** - 성능 모니터링
- **코드 생성** - 컴포넌트 템플릿 생성

## CLI 도구

### 1. create-enact-app

새로운 Enact 프로젝트를 생성합니다.

```bash
# 기본 프로젝트 생성
npx create-enact-app my-app

# TypeScript 템플릿 사용
npx create-enact-app my-app --template typescript

# 특정 버전 사용
npx create-enact-app@latest my-app
```

### 2. Enact CLI

프로젝트 관리를 위한 CLI 도구입니다.

```bash
# 개발 서버 시작
npx enact start

# 프로덕션 빌드
npx enact build

# 테스트 실행
npx enact test

# 린트 실행
npx enact lint
```

## 개발 서버

### 1. 기본 개발 서버

```bash
npm start
```

개발 서버는 다음과 같은 기능을 제공합니다:

- **핫 리로드** - 코드 변경 시 자동 새로고침
- **소스맵** - 디버깅을 위한 소스맵 생성
- **에러 오버레이** - 에러 표시
- **포트 설정** - 기본 포트 8080

### 2. 고급 설정

```js
// webpack.config.js
module.exports = {
    devServer: {
        port: 3000,
        host: '0.0.0.0',
        hot: true,
        open: true,
        historyApiFallback: true
    }
};
```

### 3. 환경 변수

```bash
# .env.development
REACT_APP_API_URL=http://localhost:3001
REACT_APP_DEBUG=true
```

## 빌드 도구

### 1. 프로덕션 빌드

```bash
npm run build
```

빌드 과정:

1. **코드 최적화** - Tree shaking, 코드 분할
2. **압축** - JavaScript, CSS 압축
3. **소스맵 생성** - 프로덕션 디버깅용
4. **정적 파일 복사** - 이미지, 폰트 등

### 2. 빌드 설정

```js
// webpack.config.prod.js
module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};
```

### 3. 다중 환경 빌드

```bash
# 개발 환경
npm run build:dev

# 스테이징 환경
npm run build:staging

# 프로덕션 환경
npm run build:prod
```

## 디버깅 도구

### 1. React Developer Tools

React 컴포넌트 디버깅을 위한 브라우저 확장 프로그램입니다.

```jsx
// 개발 모드에서만 활성화
if (process.env.NODE_ENV === 'development') {
    const {whyDidYouUpdate} = require('why-did-you-update');
    whyDidYouUpdate(React);
}
```

### 2. Enact Inspector

Enact 전용 디버깅 도구입니다.

```jsx
import {Inspector} from '@enact/dev-utils';

const App = () => (
    <div>
        <Inspector />
        <MyComponent />
    </div>
);
```

### 3. 로깅 도구

```jsx
import {logger} from '@enact/dev-utils';

// 로그 레벨 설정
logger.setLevel('debug');

// 로그 출력
logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message');
```

## 성능 분석

### 1. Bundle Analyzer

번들 크기 분석 도구입니다.

```bash
# 번들 분석 실행
npm run analyze
```

```js
// webpack.config.js
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false
        })
    ]
};
```

### 2. Lighthouse

웹 성능 측정 도구입니다.

```bash
# Lighthouse 실행
npx lighthouse http://localhost:3000 --output html
```

### 3. Performance Monitor

실시간 성능 모니터링입니다.

```jsx
import {PerformanceMonitor} from '@enact/dev-utils';

const App = () => (
    <div>
        <PerformanceMonitor />
        <MyApp />
    </div>
);
```

## 코드 생성

### 1. 컴포넌트 생성

```bash
# 컴포넌트 템플릿 생성
npx enact generate component MyComponent

# 함수형 컴포넌트 생성
npx enact generate component MyComponent --functional

# TypeScript 컴포넌트 생성
npx enact generate component MyComponent --typescript
```

### 2. 페이지 생성

```bash
# 페이지 컴포넌트 생성
npx enact generate page HomePage

# 라우트와 함께 생성
npx enact generate page HomePage --with-route
```

### 3. 테스트 파일 생성

```bash
# 테스트 파일 생성
npx enact generate test MyComponent

# E2E 테스트 생성
npx enact generate test MyComponent --e2e
```

## 개발 환경 설정

### 1. VS Code 설정

```json
// .vscode/settings.json
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "typescript.preferences.importModuleSpecifier": "relative",
    "javascript.preferences.importModuleSpecifier": "relative"
}
```

### 2. VS Code 확장 프로그램

추천 확장 프로그램:

- **ESLint** - 코드 품질 검사
- **Prettier** - 코드 포맷팅
- **React Developer Tools** - React 디버깅
- **Auto Rename Tag** - HTML 태그 자동 변경
- **Bracket Pair Colorizer** - 괄호 색상 구분

### 3. Git Hooks

```json
// package.json
{
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged",
            "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
        }
    },
    "lint-staged": {
        "*.{js,jsx,ts,tsx}": [
            "eslint --fix",
            "prettier --write"
        ]
    }
}
```

## 문제 해결

### 1. 일반적인 문제들

#### 포트 충돌
```bash
# 다른 포트 사용
PORT=3001 npm start
```

#### 메모리 부족
```bash
# Node.js 메모리 증가
NODE_OPTIONS="--max-old-space-size=4096" npm start
```

#### 캐시 문제
```bash
# 캐시 삭제
npm run clean
rm -rf node_modules/.cache
```

### 2. 디버깅 팁

```jsx
// 컴포넌트 디버깅
const MyComponent = (props) => {
    console.log('Props:', props);
    
    return (
        <div>
            {/* 컴포넌트 내용 */}
        </div>
    );
};
```

```jsx
// 상태 디버깅
const [state, setState] = useState(initialState);

useEffect(() => {
    console.log('State changed:', state);
}, [state]);
```

## 📚 관련 문서

- [ESLint 가이드](./eslint-guide.md)
- [빌드 최적화](./build-optimization.md)
- [성능 최적화](./performance-optimization.md)
- [배포 가이드](./deployment-guide.md)

## 🔗 라이브러리 문서

- [Core Library](../core-library/README.md) - 핵심 기능
- [i18n Library](../i18n-library/README.md) - 국제화 지원
- [Moonstone UI Library](../moonstone-ui-library/README.md) - UI 컴포넌트
- [Spotlight Library](../spotlight-library/README.md) - 포커스 관리
- [Router Library](../router-library/README.md) - 라우팅
- [WebOS Library](../webos-library/README.md) - WebOS 통합
- [Testing Library](../testing-library/README.md) - 테스팅 도구

## 🏠 [메인 문서로 돌아가기](../README.md) 
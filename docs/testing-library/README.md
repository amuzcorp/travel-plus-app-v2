# Enact Testing Library

Enact Testing Library는 Enact.js 애플리케이션을 위한 테스팅 도구 모음입니다.

## 개요

Testing Library는 다음과 같은 기능들을 제공합니다:

- **단위 테스트** - 개별 컴포넌트/함수 테스트
- **통합 테스트** - 컴포넌트 간 상호작용 테스트
- **E2E 테스트** - 전체 애플리케이션 테스트
- **스냅샷 테스트** - UI 변경 감지
- **모킹** - 의존성 모킹
- **코버리지** - 테스트 커버리지 측정

## 주요 기능

### 1. 컴포넌트 테스트

```jsx
import {render, screen} from '@enact/test-utils';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
    test('renders correctly', () => {
        render(<MyComponent />);
        
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });
    
    test('handles click events', () => {
        const handleClick = jest.fn();
        render(<MyComponent onClick={handleClick} />);
        
        screen.getByRole('button').click();
        
        expect(handleClick).toHaveBeenCalled();
    });
});
```

### 2. Spotlight 테스트

```jsx
import {render, screen} from '@enact/test-utils';
import {SpotlightRootDecorator} from '@enact/spotlight/SpotlightRootDecorator';

const TestComponent = SpotlightRootDecorator({}, (Base) => {
    return class TestComponent extends Base {
        render() {
            return (
                <div>
                    <button>Button 1</button>
                    <button>Button 2</button>
                </div>
            );
        }
    };
});

describe('Spotlight Navigation', () => {
    test('navigates between buttons', () => {
        render(<TestComponent />);
        
        const buttons = screen.getAllByRole('button');
        
        // 첫 번째 버튼에 포커스
        buttons[0].focus();
        expect(buttons[0]).toHaveFocus();
        
        // 오른쪽 키로 다음 버튼으로 이동
        fireEvent.keyDown(buttons[0], {key: 'ArrowRight'});
        expect(buttons[1]).toHaveFocus();
    });
});
```

### 3. Moonstone 컴포넌트 테스트

```jsx
import {render, screen} from '@enact/test-utils';
import Button from '@enact/moonstone/Button';

describe('Moonstone Button', () => {
    test('renders with text', () => {
        render(<Button>Click me</Button>);
        
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });
    
    test('handles click events', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        
        screen.getByRole('button').click();
        
        expect(handleClick).toHaveBeenCalled();
    });
    
    test('applies custom styling', () => {
        render(<Button size="large">Large Button</Button>);
        
        const button = screen.getByRole('button');
        expect(button).toHaveClass('moonstone-button--large');
    });
});
```

### 4. i18n 테스트

```jsx
import {render, screen} from '@enact/test-utils';
import {I18nContextDecorator} from '@enact/i18n';

const TestComponent = I18nContextDecorator({
    locales: ['ko-KR', 'en-US'],
    resource: {
        'ko-KR': {
            'greeting': '안녕하세요'
        },
        'en-US': {
            'greeting': 'Hello'
        }
    }
}, (Base) => {
    return class TestComponent extends Base {
        render() {
            return <div>{this.$L('greeting')}</div>;
        }
    };
});

describe('i18n Component', () => {
    test('displays Korean text by default', () => {
        render(<TestComponent />);
        
        expect(screen.getByText('안녕하세요')).toBeInTheDocument();
    });
    
    test('changes language dynamically', () => {
        const {rerender} = render(<TestComponent />);
        
        // 언어 변경
        rerender(<TestComponent locale="en-US" />);
        
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });
});
```

### 5. Router 테스트

```jsx
import {render, screen} from '@enact/test-utils';
import {Router, Route} from '@enact/router';

const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;

const TestApp = () => (
    <Router>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
    </Router>
);

describe('Router Navigation', () => {
    test('renders home page by default', () => {
        render(<TestApp />);
        
        expect(screen.getByText('Home Page')).toBeInTheDocument();
    });
    
    test('navigates to about page', () => {
        render(<TestApp />);
        
        // 프로그래매틱 네비게이션
        window.history.pushState({}, '', '/about');
        
        expect(screen.getByText('About Page')).toBeInTheDocument();
    });
});
```

### 6. WebOS 테스트

```jsx
import {render, screen} from '@enact/test-utils';
import {WebOSDecorator} from '@enact/webos/WebOSDecorator';

const TestComponent = WebOSDecorator({
    appId: 'com.test.app'
}, (Base) => {
    return class TestComponent extends Base {
        render() {
            return <div>WebOS App</div>;
        }
    };
});

describe('WebOS Component', () => {
    test('renders WebOS app', () => {
        render(<TestComponent />);
        
        expect(screen.getByText('WebOS App')).toBeInTheDocument();
    });
    
    test('handles WebOS events', () => {
        const mockWebOS = {
            on: jest.fn(),
            service: {
                request: jest.fn()
            }
        };
        
        render(<TestComponent webOS={mockWebOS} />);
        
        expect(mockWebOS.on).toHaveBeenCalled();
    });
});
```

## 테스트 유틸리티

### 1. 커스텀 렌더러

```jsx
import {render} from '@enact/test-utils';
import {MoonstoneDecorator} from '@enact/moonstone/MoonstoneDecorator';
import {SpotlightRootDecorator} from '@enact/spotlight/SpotlightRootDecorator';

const customRender = (ui, options = {}) => {
    const Wrapper = ({children}) => {
        const App = MoonstoneDecorator(
            {},
            SpotlightRootDecorator({}, (AppBase) => {
                return class App extends AppBase {
                    render() {
                        return children;
                    }
                };
            })
        );
        
        return <App />;
    };
    
    return render(ui, {wrapper: Wrapper, ...options});
};

export {customRender as render};
```

### 2. 모킹 유틸리티

```jsx
import {mockWebOS} from '@enact/test-utils';

const mockWebOSService = {
    request: jest.fn().mockResolvedValue({
        returnValue: true,
        data: {test: 'data'}
    })
};

const mockWebOSInstance = {
    service: mockWebOSService,
    on: jest.fn(),
    off: jest.fn()
};

// WebOS 모킹
mockWebOS(mockWebOSInstance);
```

### 3. 이벤트 유틸리티

```jsx
import {fireEvent, waitFor} from '@enact/test-utils';

test('handles async events', async () => {
    render(<AsyncComponent />);
    
    fireEvent.click(screen.getByRole('button'));
    
    await waitFor(() => {
        expect(screen.getByText('Loaded')).toBeInTheDocument();
    });
});
```

## 스냅샷 테스트

### 1. 기본 스냅샷 테스트

```jsx
import {render} from '@enact/test-utils';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
    test('matches snapshot', () => {
        const {container} = render(<MyComponent />);
        
        expect(container).toMatchSnapshot();
    });
});
```

### 2. 인라인 스냅샷

```jsx
import {render} from '@enact/test-utils';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
    test('renders correctly', () => {
        const {container} = render(<MyComponent />);
        
        expect(container.innerHTML).toMatchInlineSnapshot(`
            "<div>
                <h1>Hello</h1>
                <p>World</p>
            </div>"
        `);
    });
});
```

## 테스트 설정

### 1. Jest 설정

```js
// jest.config.js
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    moduleNameMapping: {
        '^@enact/(.*)$': '<rootDir>/node_modules/@enact/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/**/*.test.{js,jsx}',
        '!src/index.js'
    ]
};
```

### 2. 테스트 설정 파일

```js
// src/setupTests.js
import '@enact/test-utils/setup';

// 전역 모킹
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
}));

// WebOS 모킹
global.webOS = {
    service: {
        request: jest.fn()
    },
    on: jest.fn(),
    off: jest.fn()
};
```

## E2E 테스트

### 1. Playwright 설정

```js
// playwright.config.js
module.exports = {
    testDir: './e2e',
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry'
    },
    projects: [
        {
            name: 'chromium',
            use: {browserName: 'chromium'}
        },
        {
            name: 'firefox',
            use: {browserName: 'firefox'}
        }
    ]
};
```

### 2. E2E 테스트 예제

```js
// e2e/app.spec.js
import {test, expect} from '@playwright/test';

test('app loads correctly', async ({page}) => {
    await page.goto('/');
    
    await expect(page.getByText('Welcome')).toBeVisible();
});

test('navigates between pages', async ({page}) => {
    await page.goto('/');
    
    await page.click('text=About');
    await expect(page.getByText('About Page')).toBeVisible();
});
```

## 설치

```bash
npm install --save-dev @enact/test-utils
```

## 기본 설정

### 1. 패키지.json 스크립트

```json
{
    "scripts": {
        "test": "jest",
        "test:watch": "jest --watch",
        "test:coverage": "jest --coverage",
        "test:e2e": "playwright test"
    }
}
```

### 2. 테스트 실행

```bash
# 모든 테스트 실행
npm test

# 감시 모드
npm run test:watch

# 커버리지 포함
npm run test:coverage

# E2E 테스트
npm run test:e2e
```

## 📚 관련 문서

- [시작 가이드](./getting-started.md)
- [API 참조](./api-reference.md)
- [사용 예제](./examples.md)
- [개발자 가이드](./development.md)

## 🔗 다른 라이브러리

- [Core Library](../core-library/README.md) - 핵심 기능
- [i18n Library](../i18n-library/README.md) - 국제화 지원
- [Moonstone UI Library](../moonstone-ui-library/README.md) - UI 컴포넌트
- [Spotlight Library](../spotlight-library/README.md) - 포커스 관리
- [Router Library](../router-library/README.md) - 라우팅
- [WebOS Library](../webos-library/README.md) - WebOS 통합

## 🏠 [메인 문서로 돌아가기](../README.md) 
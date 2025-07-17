# Enact Spotlight Library

Enact Spotlight Library는 TV 리모컨 네비게이션을 위한 포커스 관리 시스템입니다.

## 개요

Spotlight Library는 다음과 같은 기능들을 제공합니다:

- **포커스 관리** - 키보드/리모컨 네비게이션
- **스폿라이트 컨테이너** - 포커스 가능한 영역 관리
- **네비게이션 규칙** - 포커스 이동 규칙 정의
- **접근성** - 스크린 리더 지원
- **성능 최적화** - 효율적인 포커스 처리

## 주요 기능

### 1. 기본 포커스 관리

```jsx
import {SpotlightRootDecorator} from '@enact/spotlight/SpotlightRootDecorator';

const App = SpotlightRootDecorator({
    restrict: 'self-only'
}, (AppBase) => {
    return class App extends AppBase {
        render() {
            return <div>My App</div>;
        }
    };
});
```

### 2. 스폿라이트 컨테이너

```jsx
import {SpotlightContainer} from '@enact/spotlight/SpotlightContainer';

const MyContainer = () => (
    <SpotlightContainer>
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
    </SpotlightContainer>
);
```

### 3. 포커스 제어

```jsx
import {useSpotlight} from '@enact/spotlight';

const MyComponent = () => {
    const {focus} = useSpotlight();
    
    const handleFocus = () => {
        focus('my-button');
    };
    
    return (
        <div>
            <button onClick={handleFocus}>Focus Button</button>
            <button id="my-button">Target Button</button>
        </div>
    );
};
```

### 4. 네비게이션 규칙

```jsx
import {SpotlightContainer} from '@enact/spotlight/SpotlightContainer';

const MyContainer = () => (
    <SpotlightContainer
        spotlightId="my-container"
        spotlightRestrict="self-only"
    >
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
    </SpotlightContainer>
);
```

### 5. 포커스 이벤트

```jsx
import {useSpotlight} from '@enact/spotlight';

const MyComponent = () => {
    const {focused} = useSpotlight();
    
    return (
        <button
            onFocus={() => console.log('Focused!')}
            onBlur={() => console.log('Blurred!')}
        >
            {focused ? 'Focused' : 'Not Focused'}
        </button>
    );
};
```

## 네비게이션 모드

### 1. 기본 모드

```jsx
import {SpotlightRootDecorator} from '@enact/spotlight/SpotlightRootDecorator';

const App = SpotlightRootDecorator({
    mode: 'pointer'
}, (AppBase) => {
    return class App extends AppBase {
        render() {
            return <div>Pointer Mode App</div>;
        }
    };
});
```

### 2. 5-way 모드

```jsx
import {SpotlightRootDecorator} from '@enact/spotlight/SpotlightRootDecorator';

const App = SpotlightRootDecorator({
    mode: '5way'
}, (AppBase) => {
    return class App extends AppBase {
        render() {
            return <div>5-way Mode App</div>;
        }
    };
});
```

## 포커스 제한

### 1. Self-only 제한

```jsx
import {SpotlightContainer} from '@enact/spotlight/SpotlightContainer';

const MyContainer = () => (
    <SpotlightContainer spotlightRestrict="self-only">
        <button>Button 1</button>
        <button>Button 2</button>
    </SpotlightContainer>
);
```

### 2. View-only 제한

```jsx
import {SpotlightContainer} from '@enact/spotlight/SpotlightContainer';

const MyContainer = () => (
    <SpotlightContainer spotlightRestrict="view-only">
        <button>Button 1</button>
        <button>Button 2</button>
    </SpotlightContainer>
);
```

## 키보드 이벤트

### 1. 기본 키 이벤트

```jsx
import {useSpotlight} from '@enact/spotlight';

const MyComponent = () => {
    const {focus} = useSpotlight();
    
    const handleKeyDown = (ev) => {
        switch (ev.keyCode) {
            case 37: // Left
                focus('prev-button');
                break;
            case 39: // Right
                focus('next-button');
                break;
            case 13: // Enter
                console.log('Enter pressed');
                break;
        }
    };
    
    return (
        <div onKeyDown={handleKeyDown}>
            <button id="prev-button">Previous</button>
            <button id="next-button">Next</button>
        </div>
    );
};
```

### 2. 커스텀 키 매핑

```jsx
import {SpotlightRootDecorator} from '@enact/spotlight/SpotlightRootDecorator';

const App = SpotlightRootDecorator({
    keyMap: {
        'left': 37,
        'right': 39,
        'up': 38,
        'down': 40,
        'enter': 13,
        'back': 8
    }
}, (AppBase) => {
    return class App extends AppBase {
        render() {
            return <div>Custom Key Map App</div>;
        }
    };
});
```

## 성능 최적화

### 1. 지연 포커스

```jsx
import {useSpotlight} from '@enact/spotlight';

const MyComponent = () => {
    const {focus} = useSpotlight();
    
    const handleDelayedFocus = () => {
        setTimeout(() => {
            focus('delayed-button');
        }, 100);
    };
    
    return (
        <div>
            <button onClick={handleDelayedFocus}>Focus After Delay</button>
            <button id="delayed-button">Delayed Button</button>
        </div>
    );
};
```

### 2. 포커스 그룹

```jsx
import {SpotlightContainer} from '@enact/spotlight/SpotlightContainer';

const MyContainer = () => (
    <SpotlightContainer spotlightId="group1">
        <button>Group 1 - Button 1</button>
        <button>Group 1 - Button 2</button>
    </SpotlightContainer>
);
```

## 설치

```bash
npm install @enact/spotlight
```

## 기본 설정

### 1. 앱 설정

```jsx
import {SpotlightRootDecorator} from '@enact/spotlight/SpotlightRootDecorator';

const App = SpotlightRootDecorator({
    mode: '5way',
    restrict: 'self-only',
    keyMap: {
        'left': 37,
        'right': 39,
        'up': 38,
        'down': 40,
        'enter': 13
    }
}, (AppBase) => {
    return class App extends AppBase {
        render() {
            return <div>My Spotlight App</div>;
        }
    };
});

export default App;
```

### 2. Moonstone과 통합

```jsx
import {MoonstoneDecorator} from '@enact/moonstone/MoonstoneDecorator';
import {SpotlightRootDecorator} from '@enact/spotlight/SpotlightRootDecorator';

const App = MoonstoneDecorator(
    {},
    SpotlightRootDecorator(
        {restrict: 'self-only'},
        (AppBase) => {
            return class App extends AppBase {
                render() {
                    return <div>My Moonstone + Spotlight App</div>;
                }
            };
        }
    )
);

export default App;
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
- [Router Library](../router-library/README.md) - 라우팅
- [WebOS Library](../webos-library/README.md) - WebOS 통합
- [Testing Library](../testing-library/README.md) - 테스팅 도구

## 🏠 [메인 문서로 돌아가기](../README.md) 
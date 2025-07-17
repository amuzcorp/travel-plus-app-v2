# Enact Moonstone UI Library

Enact Moonstone UI Library는 LG WebOS 플랫폼을 위한 UI 컴포넌트 라이브러리입니다.

## 개요

Moonstone UI Library는 다음과 같은 기능들을 제공합니다:

- **TV 최적화 UI** - TV 리모컨 네비게이션에 최적화된 컴포넌트
- **포커스 관리** - Spotlight와 통합된 포커스 시스템
- **애니메이션** - 부드러운 전환 효과
- **테마 지원** - 다크/라이트 테마
- **접근성** - WCAG 가이드라인 준수
- **반응형 디자인** - 다양한 화면 크기 지원

## 주요 컴포넌트

### 1. 기본 컴포넌트

#### Button
```jsx
import Button from '@enact/moonstone/Button';

const MyButton = () => (
    <Button>Click Me</Button>
);
```

#### Input
```jsx
import Input from '@enact/moonstone/Input';

const MyInput = () => (
    <Input placeholder="Enter text..." />
);
```

#### Checkbox
```jsx
import Checkbox from '@enact/moonstone/Checkbox';

const MyCheckbox = () => (
    <Checkbox>Accept terms</Checkbox>
);
```

### 2. 레이아웃 컴포넌트

#### Panel
```jsx
import Panel from '@enact/moonstone/Panel';

const MyPanel = () => (
    <Panel>
        <Panel.Header title="My Panel" />
        <Panel.Body>
            <p>Panel content goes here</p>
        </Panel.Body>
    </Panel>
);
```

#### Scroller
```jsx
import Scroller from '@enact/moonstone/Scroller';

const MyScroller = () => (
    <Scroller>
        <div>Scrollable content</div>
    </Scroller>
);
```

### 3. 네비게이션 컴포넌트

#### TabGroup
```jsx
import TabGroup, {Tab} from '@enact/moonstone/TabGroup';

const MyTabs = () => (
    <TabGroup>
        <Tab title="Tab 1">
            <div>Content for tab 1</div>
        </Tab>
        <Tab title="Tab 2">
            <div>Content for tab 2</div>
        </Tab>
    </TabGroup>
);
```

#### Picker
```jsx
import Picker from '@enact/moonstone/Picker';

const MyPicker = () => (
    <Picker>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
    </Picker>
);
```

### 4. 미디어 컴포넌트

#### VideoPlayer
```jsx
import VideoPlayer from '@enact/moonstone/VideoPlayer';

const MyVideoPlayer = () => (
    <VideoPlayer
        src="video.mp4"
        poster="poster.jpg"
    />
);
```

#### Image
```jsx
import Image from '@enact/moonstone/Image';

const MyImage = () => (
    <Image src="image.jpg" alt="Description" />
);
```

### 5. 피드백 컴포넌트

#### Toast
```jsx
import Toast from '@enact/moonstone/Toast';

const MyToast = () => (
    <Toast open>
        This is a toast message
    </Toast>
);
```

#### Popup
```jsx
import Popup from '@enact/moonstone/Popup';

const MyPopup = () => (
    <Popup open>
        <div>Popup content</div>
    </Popup>
);
```

## 테마 시스템

### 1. 기본 테마 사용

```jsx
import {MoonstoneDecorator} from '@enact/moonstone/MoonstoneDecorator';

const App = MoonstoneDecorator({
    skinVariants: 'highContrast'
}, (AppBase) => {
    return class App extends AppBase {
        render() {
            return <div>My App</div>;
        }
    };
});
```

### 2. 커스텀 테마

```jsx
import {MoonstoneDecorator} from '@enact/moonstone/MoonstoneDecorator';

const customTheme = {
    'moonstone': {
        'bg': '#000000',
        'text': '#ffffff'
    }
};

const App = MoonstoneDecorator({
    theme: customTheme
}, (AppBase) => {
    return class App extends AppBase {
        render() {
            return <div>My App</div>;
        }
    };
});
```

## 애니메이션

### 1. 기본 애니메이션

```jsx
import {Transition} from '@enact/moonstone/Transition';

const AnimatedComponent = () => (
    <Transition type="fade">
        <div>Animated content</div>
    </Transition>
);
```

### 2. 커스텀 애니메이션

```jsx
import {Transition} from '@enact/moonstone/Transition';

const CustomAnimation = () => (
    <Transition
        type="slide"
        direction="left"
        duration={300}
    >
        <div>Custom animated content</div>
    </Transition>
);
```

## 설치

```bash
npm install @enact/moonstone
```

## 기본 설정

### 1. 앱 설정

```jsx
import {MoonstoneDecorator} from '@enact/moonstone/MoonstoneDecorator';
import {SpotlightRootDecorator} from '@enact/spotlight/SpotlightRootDecorator';

const App = MoonstoneDecorator(
    {
        skinVariants: 'highContrast'
    },
    SpotlightRootDecorator(
        {restrict: 'self-only'},
        (AppBase) => {
            return class App extends AppBase {
                render() {
                    return <div>My Moonstone App</div>;
                }
            };
        }
    )
);

export default App;
```

### 2. CSS 임포트

```jsx
import '@enact/moonstone/styles/moonstone.less';
```

## 📚 관련 문서

- [시작 가이드](./getting-started.md)
- [API 참조](./api-reference.md)
- [사용 예제](./examples.md)
- [개발자 가이드](./development.md)

## 🔗 다른 라이브러리

- [Core Library](../core-library/README.md) - 핵심 기능
- [i18n Library](../i18n-library/README.md) - 국제화 지원
- [Spotlight Library](../spotlight-library/README.md) - 포커스 관리
- [Router Library](../router-library/README.md) - 라우팅
- [WebOS Library](../webos-library/README.md) - WebOS 통합
- [Testing Library](../testing-library/README.md) - 테스팅 도구

## 🏠 [메인 문서로 돌아가기](../README.md) 
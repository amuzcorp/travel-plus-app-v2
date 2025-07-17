# Core Library 시작 가이드

이 가이드는 Enact Core Library를 사용하여 첫 번째 컴포넌트를 만드는 방법을 설명합니다.

## 사전 요구사항

- Node.js (v14 이상)
- npm 또는 yarn
- React 기본 지식

## 설치

### 1. 새 프로젝트 생성

```bash
npx create-enact-app my-app
cd my-app
```

### 2. Core Library 설치

```bash
npm install @enact/core
```

## 첫 번째 컴포넌트 만들기

### 1. 기본 컴포넌트

```jsx
import {Component} from '@enact/core';

class MyFirstComponent extends Component {
    render() {
        return <div>Hello Enact!</div>;
    }
}

export default MyFirstComponent;
```

### 2. Kind를 사용한 함수형 컴포넌트

```jsx
import {kind} from '@enact/core';

const MyComponent = kind({
    name: 'MyComponent',
    
    render: (props) => {
        return <div>Hello from {props.name}!</div>;
    }
});

export default MyComponent;
```

### 3. Props와 상태 사용

```jsx
import {kind} from '@enact/core';

const Counter = kind({
    name: 'Counter',
    
    render: (props) => {
        const [count, setCount] = React.useState(0);
        
        return (
            <div>
                <p>Count: {count}</p>
                <button onClick={() => setCount(count + 1)}>
                    Increment
                </button>
            </div>
        );
    }
});

export default Counter;
```

## 컴포넌트 조합

### 1. 여러 컴포넌트 조합

```jsx
import {kind} from '@enact/core';

const Header = kind({
    name: 'Header',
    render: () => <header>My App</header>
});

const Content = kind({
    name: 'Content',
    render: (props) => <main>{props.children}</main>
});

const App = kind({
    name: 'App',
    render: () => (
        <div>
            <Header />
            <Content>
                <p>This is the main content.</p>
            </Content>
        </div>
    )
});

export default App;
```

## 이벤트 처리

### 1. 기본 이벤트 처리

```jsx
import {kind} from '@enact/core';

const Button = kind({
    name: 'Button',
    
    render: (props) => {
        const handleClick = (ev) => {
            console.log('Button clicked!');
            if (props.onClick) {
                props.onClick(ev);
            }
        };
        
        return (
            <button onClick={handleClick}>
                {props.children}
            </button>
        );
    }
});

export default Button;
```

### 2. useHandlers 사용

```jsx
import {kind, useHandlers} from '@enact/core';

const Button = kind({
    name: 'Button',
    
    render: (props) => {
        const handlers = useHandlers({
            onClick: (ev) => {
                console.log('Button clicked!');
                if (props.onClick) {
                    props.onClick(ev);
                }
            }
        });
        
        return (
            <button onClick={handlers.onClick}>
                {props.children}
            </button>
        );
    }
});

export default Button;
```

## 스타일링

### 1. CSS 클래스 사용

```jsx
import {kind} from '@enact/core';
import './MyComponent.css';

const MyComponent = kind({
    name: 'MyComponent',
    
    render: (props) => {
        return (
            <div className="my-component">
                <h1 className="title">My Title</h1>
                <p className="content">My content</p>
            </div>
        );
    }
});

export default MyComponent;
```

### 2. 인라인 스타일

```jsx
import {kind} from '@enact/core';

const MyComponent = kind({
    name: 'MyComponent',
    
    render: (props) => {
        const styles = {
            container: {
                padding: '20px',
                backgroundColor: '#f0f0f0'
            },
            title: {
                color: '#333',
                fontSize: '24px'
            }
        };
        
        return (
            <div style={styles.container}>
                <h1 style={styles.title}>My Title</h1>
            </div>
        );
    }
});

export default MyComponent;
```

## 다음 단계

이제 기본적인 컴포넌트를 만들 수 있습니다. 다음 문서들을 참조하여 더 고급 기능을 학습하세요:

- [API 참조](./api-reference.md) - 모든 API 문서
- [사용 예제](./examples.md) - 실제 사용 예제
- [개발자 가이드](./development.md) - 개발 팁과 모범 사례 
# Enact Core Library

Enact Core Library는 Enact.js 프레임워크의 핵심 기능을 제공하는 라이브러리입니다.

## 개요

Core Library는 다음과 같은 핵심 기능들을 제공합니다:

- **Component System** - React 기반 컴포넌트 시스템
- **Hooks** - 커스텀 React Hooks
- **Context** - 전역 상태 관리
- **Utilities** - 유틸리티 함수들
- **Platform Support** - 플랫폼별 지원

## 주요 기능

### 1. Component System

Enact의 컴포넌트 시스템은 React를 기반으로 하며, 다음과 같은 기능을 제공합니다:

- **Kind** - 컴포넌트 래핑 및 기능 확장
- **HOC (Higher-Order Components)** - 컴포넌트 재사용성 향상
- **Composable Components** - 조합 가능한 컴포넌트

### 2. Hooks

Enact는 다음과 같은 커스텀 Hooks를 제공합니다:

- `useHandlers` - 이벤트 핸들러 관리
- `useCallback` - 메모이제이션된 콜백
- `useMemo` - 메모이제이션된 값
- `useState` - 상태 관리
- `useEffect` - 사이드 이펙트 관리

### 3. Context

전역 상태 관리를 위한 Context API를 제공합니다:

- **Provider Pattern** - 데이터 제공자 패턴
- **Consumer Pattern** - 데이터 소비자 패턴
- **Context Composition** - 컨텍스트 조합

### 4. Utilities

다양한 유틸리티 함수들을 제공합니다:

- **Object Utilities** - 객체 조작 함수
- **Array Utilities** - 배열 조작 함수
- **String Utilities** - 문자열 조작 함수
- **Type Checking** - 타입 검사 함수

## 설치

```bash
npm install @enact/core
```

## 기본 사용법

```jsx
import {Component, kind} from '@enact/core';

const MyComponent = kind({
    name: 'MyComponent',
    
    render: (props) => {
        return <div>Hello Enact!</div>;
    }
});

export default MyComponent;
```

## 📚 관련 문서

- [시작 가이드](./getting-started.md)
- [API 참조](./api-reference.md)
- [사용 예제](./examples.md)
- [개발자 가이드](./development.md)

## 🔗 다른 라이브러리

- [i18n Library](../i18n-library/README.md) - 국제화 지원
- [Moonstone UI Library](../moonstone-ui-library/README.md) - UI 컴포넌트
- [Spotlight Library](../spotlight-library/README.md) - 포커스 관리
- [Router Library](../router-library/README.md) - 라우팅
- [WebOS Library](../webos-library/README.md) - WebOS 통합
- [Testing Library](../testing-library/README.md) - 테스팅 도구

## 🏠 [메인 문서로 돌아가기](../README.md) 
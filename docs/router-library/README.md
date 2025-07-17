# Enact Router Library

Enact Router Library는 애플리케이션의 라우팅을 관리하는 라이브러리입니다.

## 개요

Router Library는 다음과 같은 기능들을 제공합니다:

- **라우트 정의** - URL과 컴포넌트 매핑
- **동적 라우팅** - 파라미터 기반 라우팅
- **중첩 라우팅** - 계층적 라우트 구조
- **라우트 가드** - 접근 제어
- **히스토리 관리** - 브라우저 히스토리 통합
- **쿼리 파라미터** - URL 쿼리 스트링 처리

## 주요 기능

### 1. 기본 라우팅

```jsx
import {Router, Route} from '@enact/router';

const App = () => (
    <Router>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
    </Router>
);
```

### 2. 동적 라우팅

```jsx
import {Router, Route} from '@enact/router';

const App = () => (
    <Router>
        <Route path="/users/:id" component={UserDetail} />
        <Route path="/products/:category/:id" component={ProductDetail} />
    </Router>
);
```

### 3. 중첩 라우팅

```jsx
import {Router, Route} from '@enact/router';

const App = () => (
    <Router>
        <Route path="/admin" component={AdminLayout}>
            <Route path="/admin/users" component={UserManagement} />
            <Route path="/admin/settings" component={Settings} />
        </Route>
    </Router>
);
```

### 4. 라우트 파라미터 사용

```jsx
import {useParams} from '@enact/router';

const UserDetail = () => {
    const {id} = useParams();
    
    return (
        <div>
            <h1>User {id}</h1>
            <p>User details for ID: {id}</p>
        </div>
    );
};
```

### 5. 쿼리 파라미터

```jsx
import {useQuery} from '@enact/router';

const SearchResults = () => {
    const query = useQuery();
    const searchTerm = query.get('q');
    
    return (
        <div>
            <h1>Search Results</h1>
            <p>Searching for: {searchTerm}</p>
        </div>
    );
};
```

### 6. 프로그래매틱 네비게이션

```jsx
import {useNavigate} from '@enact/router';

const MyComponent = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/about');
    };
    
    const handleGoBack = () => {
        navigate(-1);
    };
    
    return (
        <div>
            <button onClick={handleClick}>Go to About</button>
            <button onClick={handleGoBack}>Go Back</button>
        </div>
    );
};
```

## 라우트 가드

### 1. 인증 가드

```jsx
import {Route, useAuth} from '@enact/router';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated} = useAuth();
    
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};
```

### 2. 권한 가드

```jsx
import {Route, useAuth} from '@enact/router';

const AdminRoute = ({component: Component, ...rest}) => {
    const {user} = useAuth();
    
    return (
        <Route
            {...rest}
            render={props =>
                user?.role === 'admin' ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/unauthorized" />
                )
            }
        />
    );
};
```

## 히스토리 관리

### 1. 브라우저 히스토리

```jsx
import {Router} from '@enact/router';

const App = () => (
    <Router history="browser">
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
    </Router>
);
```

### 2. 해시 히스토리

```jsx
import {Router} from '@enact/router';

const App = () => (
    <Router history="hash">
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
    </Router>
);
```

## 라우트 설정

### 1. 기본 설정

```jsx
import {Router} from '@enact/router';

const App = () => (
    <Router
        basename="/app"
        history="browser"
    >
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
    </Router>
);
```

### 2. 커스텀 히스토리

```jsx
import {createBrowserHistory} from '@enact/router';

const customHistory = createBrowserHistory({
    basename: '/app'
});

const App = () => (
    <Router history={customHistory}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
    </Router>
);
```

## 라우트 훅

### 1. useLocation

```jsx
import {useLocation} from '@enact/router';

const MyComponent = () => {
    const location = useLocation();
    
    return (
        <div>
            <p>Current path: {location.pathname}</p>
            <p>Search: {location.search}</p>
        </div>
    );
};
```

### 2. useHistory

```jsx
import {useHistory} from '@enact/router';

const MyComponent = () => {
    const history = useHistory();
    
    const goBack = () => {
        history.goBack();
    };
    
    const goForward = () => {
        history.goForward();
    };
    
    return (
        <div>
            <button onClick={goBack}>Back</button>
            <button onClick={goForward}>Forward</button>
        </div>
    );
};
```

## 라우트 설정 파일

### 1. 라우트 정의

```jsx
// routes.js
export const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/users/:id',
        component: UserDetail
    },
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            {
                path: '/admin/users',
                component: UserManagement
            },
            {
                path: '/admin/settings',
                component: Settings
            }
        ]
    }
];
```

### 2. 라우트 렌더링

```jsx
import {Router, Route} from '@enact/router';
import {routes} from './routes';

const renderRoutes = (routes) => {
    return routes.map((route, index) => (
        <Route
            key={index}
            path={route.path}
            component={route.component}
            exact={route.exact}
        >
            {route.children && renderRoutes(route.children)}
        </Route>
    ));
};

const App = () => (
    <Router>
        {renderRoutes(routes)}
    </Router>
);
```

## 설치

```bash
npm install @enact/router
```

## 기본 설정

### 1. 앱 설정

```jsx
import {Router, Route} from '@enact/router';

const App = () => (
    <Router basename="/app">
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
    </Router>
);

export default App;
```

### 2. 라우트 컴포넌트

```jsx
// Home.js
const Home = () => (
    <div>
        <h1>Home Page</h1>
        <p>Welcome to our app!</p>
    </div>
);

// About.js
const About = () => (
    <div>
        <h1>About Page</h1>
        <p>Learn more about us.</p>
    </div>
);

// Contact.js
const Contact = () => (
    <div>
        <h1>Contact Page</h1>
        <p>Get in touch with us.</p>
    </div>
);
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
- [WebOS Library](../webos-library/README.md) - WebOS 통합
- [Testing Library](../testing-library/README.md) - 테스팅 도구

## 🏠 [메인 문서로 돌아가기](../README.md) 
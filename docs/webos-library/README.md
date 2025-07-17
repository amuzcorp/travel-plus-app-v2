# Enact WebOS Library

Enact WebOS Library는 LG WebOS 플랫폼과의 통합을 지원하는 라이브러리입니다.

## 개요

WebOS Library는 다음과 같은 기능들을 제공합니다:

- **WebOS API 통합** - WebOS 플랫폼 API 접근
- **앱 생명주기 관리** - 앱 시작/종료/백그라운드 처리
- **시스템 이벤트** - 시스템 레벨 이벤트 처리
- **미디어 컨트롤** - 미디어 재생 제어
- **알림 시스템** - 시스템 알림 관리
- **설정 관리** - 앱 설정 저장/로드

## 주요 기능

### 1. WebOS API 접근

```jsx
import {useWebOS} from '@enact/webos';

const MyComponent = () => {
    const {webOS} = useWebOS();
    
    const getSystemInfo = () => {
        webOS.service.request('luna://com.webos.service.tv.systemproperty', {
            method: 'getSystemInfo',
            parameters: {}
        }).then(response => {
            console.log('System Info:', response);
        });
    };
    
    return (
        <button onClick={getSystemInfo}>
            Get System Info
        </button>
    );
};
```

### 2. 앱 생명주기 관리

```jsx
import {useWebOS} from '@enact/webos';

const App = () => {
    const {webOS} = useWebOS();
    
    React.useEffect(() => {
        // 앱 시작 시
        webOS.on('launch', (launchParams) => {
            console.log('App launched with params:', launchParams);
        });
        
        // 앱 종료 시
        webOS.on('close', () => {
            console.log('App closing');
        });
        
        // 백그라운드 진입 시
        webOS.on('pause', () => {
            console.log('App paused');
        });
        
        // 포그라운드 복귀 시
        webOS.on('resume', () => {
            console.log('App resumed');
        });
    }, []);
    
    return <div>My WebOS App</div>;
};
```

### 3. 시스템 이벤트 처리

```jsx
import {useWebOS} from '@enact/webos';

const SystemEvents = () => {
    const {webOS} = useWebOS();
    
    React.useEffect(() => {
        // 키 이벤트
        webOS.on('keydown', (event) => {
            console.log('Key pressed:', event.keyCode);
        });
        
        // 포커스 이벤트
        webOS.on('focus', () => {
            console.log('App focused');
        });
        
        webOS.on('blur', () => {
            console.log('App blurred');
        });
    }, []);
    
    return <div>System Events Component</div>;
};
```

### 4. 미디어 컨트롤

```jsx
import {useWebOS} from '@enact/webos';

const MediaControl = () => {
    const {webOS} = useWebOS();
    
    const playMedia = () => {
        webOS.service.request('luna://com.webos.service.media', {
            method: 'play',
            parameters: {
                uri: 'http://example.com/video.mp4'
            }
        });
    };
    
    const pauseMedia = () => {
        webOS.service.request('luna://com.webos.service.media', {
            method: 'pause'
        });
    };
    
    const stopMedia = () => {
        webOS.service.request('luna://com.webos.service.media', {
            method: 'stop'
        });
    };
    
    return (
        <div>
            <button onClick={playMedia}>Play</button>
            <button onClick={pauseMedia}>Pause</button>
            <button onClick={stopMedia}>Stop</button>
        </div>
    );
};
```

### 5. 알림 시스템

```jsx
import {useWebOS} from '@enact/webos';

const NotificationSystem = () => {
    const {webOS} = useWebOS();
    
    const showNotification = () => {
        webOS.service.request('luna://com.webos.notification', {
            method: 'createToast',
            parameters: {
                message: 'Hello from WebOS!',
                sourceId: 'my-app'
            }
        });
    };
    
    const showAlert = () => {
        webOS.service.request('luna://com.webos.notification', {
            method: 'createAlert',
            parameters: {
                message: 'This is an alert',
                buttons: ['OK', 'Cancel']
            }
        });
    };
    
    return (
        <div>
            <button onClick={showNotification}>Show Toast</button>
            <button onClick={showAlert}>Show Alert</button>
        </div>
    );
};
```

### 6. 설정 관리

```jsx
import {useWebOS} from '@enact/webos';

const SettingsManager = () => {
    const {webOS} = useWebOS();
    
    const saveSetting = (key, value) => {
        webOS.service.request('luna://com.webos.settings', {
            method: 'setSystemSettings',
            parameters: {
                category: 'my-app',
                settings: {
                    [key]: value
                }
            }
        });
    };
    
    const loadSetting = (key) => {
        webOS.service.request('luna://com.webos.settings', {
            method: 'getSystemSettings',
            parameters: {
                category: 'my-app',
                keys: [key]
            }
        }).then(response => {
            console.log('Setting value:', response.settings[key]);
        });
    };
    
    return (
        <div>
            <button onClick={() => saveSetting('theme', 'dark')}>
                Save Dark Theme
            </button>
            <button onClick={() => loadSetting('theme')}>
                Load Theme Setting
            </button>
        </div>
    );
};
```

## WebOS 서비스

### 1. 시스템 서비스

```jsx
import {useWebOS} from '@enact/webos';

const SystemServices = () => {
    const {webOS} = useWebOS();
    
    const getDeviceInfo = () => {
        webOS.service.request('luna://com.webos.service.tv.systemproperty', {
            method: 'getSystemInfo',
            parameters: {}
        }).then(response => {
            console.log('Device Info:', response);
        });
    };
    
    const getNetworkInfo = () => {
        webOS.service.request('luna://com.webos.service.connectionmanager', {
            method: 'getStatus',
            parameters: {}
        }).then(response => {
            console.log('Network Info:', response);
        });
    };
    
    return (
        <div>
            <button onClick={getDeviceInfo}>Get Device Info</button>
            <button onClick={getNetworkInfo}>Get Network Info</button>
        </div>
    );
};
```

### 2. 미디어 서비스

```jsx
import {useWebOS} from '@enact/webos';

const MediaServices = () => {
    const {webOS} = useWebOS();
    
    const getMediaInfo = () => {
        webOS.service.request('luna://com.webos.service.media', {
            method: 'getMediaInfo',
            parameters: {}
        }).then(response => {
            console.log('Media Info:', response);
        });
    };
    
    const setVolume = (volume) => {
        webOS.service.request('luna://com.webos.service.audio', {
            method: 'setVolume',
            parameters: {
                volume: volume
            }
        });
    };
    
    return (
        <div>
            <button onClick={getMediaInfo}>Get Media Info</button>
            <button onClick={() => setVolume(50)}>Set Volume 50%</button>
        </div>
    );
};
```

## 앱 설정

### 1. 기본 설정

```jsx
import {WebOSDecorator} from '@enact/webos/WebOSDecorator';

const App = WebOSDecorator({
    appId: 'com.example.myapp',
    appVersion: '1.0.0'
}, (AppBase) => {
    return class App extends AppBase {
        render() {
            return <div>My WebOS App</div>;
        }
    };
});

export default App;
```

### 2. 고급 설정

```jsx
import {WebOSDecorator} from '@enact/webos/WebOSDecorator';

const App = WebOSDecorator({
    appId: 'com.example.myapp',
    appVersion: '1.0.0',
    services: [
        'luna://com.webos.service.tv.systemproperty',
        'luna://com.webos.service.media',
        'luna://com.webos.notification'
    ],
    permissions: [
        'time.query',
        'activity.operation',
        'media.operation'
    ]
}, (AppBase) => {
    return class App extends AppBase {
        render() {
            return <div>My WebOS App</div>;
        }
    };
});

export default App;
```

## 이벤트 처리

### 1. 키 이벤트

```jsx
import {useWebOS} from '@enact/webos';

const KeyHandler = () => {
    const {webOS} = useWebOS();
    
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.keyCode) {
                case 13: // Enter
                    console.log('Enter pressed');
                    break;
                case 37: // Left
                    console.log('Left arrow pressed');
                    break;
                case 39: // Right
                    console.log('Right arrow pressed');
                    break;
                case 38: // Up
                    console.log('Up arrow pressed');
                    break;
                case 40: // Down
                    console.log('Down arrow pressed');
                    break;
            }
        };
        
        webOS.on('keydown', handleKeyDown);
        
        return () => {
            webOS.off('keydown', handleKeyDown);
        };
    }, []);
    
    return <div>Key Handler Component</div>;
};
```

### 2. 시스템 이벤트

```jsx
import {useWebOS} from '@enact/webos';

const SystemEventHandler = () => {
    const {webOS} = useWebOS();
    
    React.useEffect(() => {
        // 네트워크 상태 변경
        webOS.on('networkStatusChanged', (status) => {
            console.log('Network status:', status);
        });
        
        // 배터리 상태 변경
        webOS.on('batteryStatusChanged', (status) => {
            console.log('Battery status:', status);
        });
        
        // 시간 변경
        webOS.on('timeChanged', (time) => {
            console.log('Time changed:', time);
        });
    }, []);
    
    return <div>System Event Handler</div>;
};
```

## 설치

```bash
npm install @enact/webos
```

## 기본 설정

### 1. 앱 설정

```jsx
import {WebOSDecorator} from '@enact/webos/WebOSDecorator';

const App = WebOSDecorator({
    appId: 'com.example.myapp',
    appVersion: '1.0.0'
}, (AppBase) => {
    return class App extends AppBase {
        render() {
            return <div>My WebOS App</div>;
        }
    };
});

export default App;
```

### 2. 서비스 등록

```jsx
// appinfo.json
{
    "id": "com.example.myapp",
    "version": "1.0.0",
    "vendor": "Example Inc.",
    "type": "web",
    "main": "index.html",
    "title": "My WebOS App",
    "icon": "icon.png",
    "largeIcon": "largeIcon.png"
}
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
- [Testing Library](../testing-library/README.md) - 테스팅 도구

## 🏠 [메인 문서로 돌아가기](../README.md) 
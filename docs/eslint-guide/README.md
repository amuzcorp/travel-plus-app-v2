# Enact ESLint 가이드

Enact.js 프로젝트를 위한 ESLint 설정 및 규칙 가이드입니다.

## 개요

ESLint는 JavaScript/TypeScript 코드의 품질을 유지하고 일관된 코딩 스타일을 보장하는 도구입니다.

## 주요 기능

- **코드 품질 검사** - 잠재적 버그 및 문제점 발견
- **스타일 가이드** - 일관된 코딩 스타일 적용
- **Enact 규칙** - Enact.js 특화 규칙 적용
- **자동 수정** - 자동으로 수정 가능한 문제 해결
- **팀 협업** - 팀 전체의 코드 품질 향상

## 설치

### 1. 기본 설치

```bash
npm install --save-dev eslint @enact/eslint-config
```

### 2. TypeScript 지원

```bash
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 3. 추가 플러그인

```bash
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

## 설정

### 1. 기본 설정

```js
// .eslintrc.js
module.exports = {
    extends: [
        '@enact/eslint-config'
    ],
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    }
};
```

### 2. TypeScript 설정

```js
// .eslintrc.js
module.exports = {
    extends: [
        '@enact/eslint-config',
        '@enact/eslint-config/typescript'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    }
};
```

### 3. React 설정

```js
// .eslintrc.js
module.exports = {
    extends: [
        '@enact/eslint-config',
        '@enact/eslint-config/react'
    ],
    plugins: ['react', 'react-hooks'],
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn'
    }
};
```

## Enact 특화 규칙

### 1. Spotlight 규칙

```js
// .eslintrc.js
module.exports = {
    extends: [
        '@enact/eslint-config',
        '@enact/eslint-config/spotlight'
    ],
    rules: {
        // Spotlight 컨테이너 사용 권장
        'enact/spotlight-container': 'error',
        
        // 포커스 가능한 요소에 tabIndex 설정
        'enact/focusable-elements': 'warn'
    }
};
```

### 2. Moonstone 규칙

```js
// .eslintrc.js
module.exports = {
    extends: [
        '@enact/eslint-config',
        '@enact/eslint-config/moonstone'
    ],
    rules: {
        // Moonstone 컴포넌트 사용 권장
        'enact/moonstone-components': 'warn',
        
        // 접근성 속성 필수
        'enact/accessibility-attributes': 'error'
    }
};
```

### 3. i18n 규칙

```js
// .eslintrc.js
module.exports = {
    extends: [
        '@enact/eslint-config',
        '@enact/eslint-config/i18n'
    ],
    rules: {
        // 하드코딩된 문자열 금지
        'enact/no-hardcoded-strings': 'error',
        
        // i18n 함수 사용 권장
        'enact/use-i18n': 'warn'
    }
};
```

## 일반적인 규칙

### 1. 코드 품질

```js
// .eslintrc.js
module.exports = {
    rules: {
        // 사용하지 않는 변수 금지
        'no-unused-vars': 'error',
        
        // 사용하지 않는 import 금지
        'no-unused-imports': 'error',
        
        // console.log 금지 (개발 환경 제외)
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        
        // debugger 문 금지
        'no-debugger': 'error',
        
        // 전역 변수 사용 금지
        'no-undef': 'error'
    }
};
```

### 2. 스타일 규칙

```js
// .eslintrc.js
module.exports = {
    rules: {
        // 세미콜론 필수
        'semi': ['error', 'always'],
        
        // 작은따옴표 사용
        'quotes': ['error', 'single'],
        
        // 들여쓰기 (2칸)
        'indent': ['error', 2],
        
        // 후행 쉼표
        'comma-dangle': ['error', 'always-multiline'],
        
        // 최대 줄 길이
        'max-len': ['error', { 'code': 100 }]
    }
};
```

### 3. React 규칙

```js
// .eslintrc.js
module.exports = {
    rules: {
        // JSX에서 key prop 필수
        'react/jsx-key': 'error',
        
        // 사용하지 않는 prop 금지
        'react/no-unused-prop-types': 'error',
        
        // prop-types 필수
        'react/prop-types': 'error',
        
        // Fragment 사용 권장
        'react/jsx-fragments': 'error'
    }
};
```

## 자동 수정

### 1. 명령어 실행

```bash
# 모든 파일 검사 및 수정
npx eslint . --fix

# 특정 파일만 검사
npx eslint src/components/MyComponent.js --fix

# 특정 디렉터리만 검사
npx eslint src/ --fix
```

### 2. 패키지.json 스크립트

```json
{
    "scripts": {
        "lint": "eslint .",
        "lint:fix": "eslint . --fix",
        "lint:check": "eslint . --max-warnings 0"
    }
}
```

### 3. Git Hooks

```json
// package.json
{
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    },
    "lint-staged": {
        "*.{js,jsx,ts,tsx}": [
            "eslint --fix"
        ]
    }
}
```

## IDE 통합

### 1. VS Code 설정

```json
// .vscode/settings.json
{
    "eslint.enable": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.workingDirectories": [
        "./src"
    ]
}
```

### 2. WebStorm 설정

```js
// .eslintrc.js
module.exports = {
    // WebStorm에서 ESLint 인식
    root: true,
    
    extends: [
        '@enact/eslint-config'
    ]
};
```

## 커스텀 규칙

### 1. 프로젝트 특화 규칙

```js
// .eslintrc.js
module.exports = {
    extends: [
        '@enact/eslint-config'
    ],
    rules: {
        // 커스텀 규칙
        'custom-rule': 'error',
        
        // 파일명 규칙
        'enact/filename-convention': [
            'error',
            {
                pattern: '^[A-Z][a-zA-Z0-9]*$',
                message: '컴포넌트 파일명은 PascalCase여야 합니다.'
            }
        ]
    }
};
```

### 2. 플러그인 개발

```js
// eslint-plugin-custom/index.js
module.exports = {
    rules: {
        'no-console-in-production': {
            create(context) {
                return {
                    CallExpression(node) {
                        if (node.callee.name === 'console' && 
                            process.env.NODE_ENV === 'production') {
                            context.report({
                                node,
                                message: '프로덕션 환경에서 console 사용을 금지합니다.'
                            });
                        }
                    }
                };
            }
        }
    }
};
```

## 문제 해결

### 1. 일반적인 에러

#### Parsing Error
```js
// .eslintrc.js
module.exports = {
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    }
};
```

#### Import Error
```js
// .eslintrc.js
module.exports = {
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    }
};
```

### 2. 성능 최적화

```js
// .eslintrc.js
module.exports = {
    // 캐시 활성화
    cache: true,
    cacheLocation: '.eslintcache',
    
    // 병렬 처리
    maxWorkers: 4
};
```

## 모범 사례

### 1. 팀 설정

```js
// .eslintrc.js
module.exports = {
    extends: [
        '@enact/eslint-config'
    ],
    // 팀 전체가 동의한 규칙
    rules: {
        // 코드 리뷰 필수
        'enact/require-code-review': 'warn',
        
        // 테스트 커버리지
        'enact/test-coverage': 'error'
    }
};
```

### 2. 점진적 도입

```js
// .eslintrc.js
module.exports = {
    extends: [
        '@enact/eslint-config'
    ],
    // 새로운 규칙은 경고로 시작
    rules: {
        'new-rule': 'warn'
    },
    // 점진적으로 에러로 변경
    overrides: [
        {
            files: ['src/new-features/**/*.js'],
            rules: {
                'new-rule': 'error'
            }
        }
    ]
};
```

## 📚 관련 문서

- [개발자 도구](../developer-tools/README.md)
- [코딩 스타일 가이드](./coding-style-guide.md)
- [TypeScript 가이드](./typescript-guide.md)
- [테스트 가이드](../testing-library/README.md)

## 🔗 라이브러리 문서

- [Core Library](../core-library/README.md) - 핵심 기능
- [i18n Library](../i18n-library/README.md) - 국제화 지원
- [Moonstone UI Library](../moonstone-ui-library/README.md) - UI 컴포넌트
- [Spotlight Library](../spotlight-library/README.md) - 포커스 관리
- [Router Library](../router-library/README.md) - 라우팅
- [WebOS Library](../webos-library/README.md) - WebOS 통합
- [Testing Library](../testing-library/README.md) - 테스팅 도구

## 🏠 [메인 문서로 돌아가기](../README.md) 
// .eslintrc.js
import deepMerge from "deepmerge";

const defaultConfig = {
  extends: ["@enact/eslint-config"],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const tsConfig = {
  extends: ["@enact/eslint-config", "@enact/eslint-config/typescript"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const reactConfig = {
  extends: ["@enact/eslint-config", "@enact/eslint-config/react"],
  plugins: ["react", "react-hooks"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // JSX에서 key prop 필수
    "react/jsx-key": "error",

    // 사용하지 않는 prop 금지
    "react/no-unused-prop-types": "error",

    // prop-types 필수
    "react/prop-types": "error",

    // Fragment 사용 권장
    "react/jsx-fragments": "error",
  },
};

const spotlightConfig = {
  extends: ["@enact/eslint-config", "@enact/eslint-config/spotlight"],
  rules: {
    // Spotlight 컨테이너 사용 권장
    "enact/spotlight-container": "error",

    // 포커스 가능한 요소에 tabIndex 설정
    "enact/focusable-elements": "warn",
  },
};

const moonstoneConfig = {
  extends: ["@enact/eslint-config", "@enact/eslint-config/moonstone"],
  rules: {
    // Moonstone 컴포넌트 사용 권장
    "enact/moonstone-components": "warn",

    // 접근성 속성 필수
    "enact/accessibility-attributes": "error",
  },
};

const i18nConfig = {
  extends: ["@enact/eslint-config", "@enact/eslint-config/i18n"],
  rules: {
    // 하드코딩된 문자열 금지
    "enact/no-hardcoded-strings": "error",

    // i18n 함수 사용 권장
    "enact/use-i18n": "warn",
  },
};

const codeConfig = {
  rules: {
    // 사용하지 않는 변수 금지
    "no-unused-vars": "error",

    // 사용하지 않는 import 금지
    "no-unused-imports": "error",

    // console.log 금지 (개발 환경 제외)
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",

    // debugger 문 금지
    "no-debugger": "error",

    // 전역 변수 사용 금지
    "no-undef": "error",
  },
};

const styleConfig = {
  rules: {
    // 세미콜론 필수
    semi: ["error", "always"],

    // 작은따옴표 사용
    quotes: ["error", "single"],

    // 들여쓰기 (2칸)
    indent: ["error", 2],

    // 후행 쉼표
    "comma-dangle": ["error", "always-multiline"],

    // 최대 줄 길이
    "max-len": ["error", { code: 100 }],
  },
};

module.exports = deepMerge.all([
  defaultConfig,
  tsConfig,
  reactConfig,
  spotlightConfig,
  moonstoneConfig,
  i18nConfig,
  codeConfig,
  styleConfig,
]);

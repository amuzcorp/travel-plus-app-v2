// !!! 더이상 이 파일은 손대지 마세요 !!!
// !!! .env.local 파일을 수정해서 환경 변수를 변경하세요 !!!

const ENV_CONFIG = {
  local: {
    API_URL:
      process.env.REACT_APP_API_URL ||
      "https://travel-plus-cms.dev.amuz.kr/api",
    ENV: "local",
    IS_PRODUCTION: false,
    IS_DEVELOPMENT: false,
    IS_LOCAL: true,
    USER_NUMBER: "KR2507048129312",
    DEVICE_ID: process.env.REACT_APP_DEVICE_ID || "",
  },
  dev: {
    API_URL:
      process.env.REACT_APP_API_URL ||
      "https://travel-plus-cms.dev.amuz.kr/api",
    ENV: "development",
    IS_PRODUCTION: false,
    IS_DEVELOPMENT: true,
    IS_LOCAL: false,
    USER_NUMBER: process.env.REACT_APP_USER_NUMBER || "design-qa",
    DEVICE_ID: process.env.REACT_APP_DEVICE_ID || "design-qa",
  },
  prod: {
    API_URL:
      process.env.REACT_APP_API_URL ||
      "https://travel-plus-cms.dev.amuz.kr/api",
    ENV: "production",
    IS_PRODUCTION: true,
    IS_DEVELOPMENT: false,
    USER_NUMBER: null,
    IS_LOCAL: false,
  },
} as const;

type EnvKey = keyof typeof ENV_CONFIG;

const CURRENT_ENV: EnvKey = process.env.REACT_APP_ENV as EnvKey;

const env = ENV_CONFIG[CURRENT_ENV] || ENV_CONFIG.local;

export default env;

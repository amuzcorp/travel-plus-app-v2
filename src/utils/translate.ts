import $L from "@enact/i18n/$L";

/**
 * @param key - i18n 키 (예: "navigation.tabProgress")
 * @param params - 템플릿에 주입할 값들 (예: { current: 2, total: 7 }) — 생략 가능
 * @returns 치환된 최종 문자열
 */
export const translate = (key: string, params?: Record<string, string | number>): string => {
  const raw = $L(key);

  if (!params) return raw;

  return raw.replace(/{{(.*?)}}/g, (_, match) => {
    const trimmedKey = match.trim();
    return params[trimmedKey]?.toString() ?? "";
  });
};

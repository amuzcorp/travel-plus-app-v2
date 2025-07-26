import $L from "@enact/i18n/$L";

/**
 * @param key - i18n 키 (예: "navigation.tabProgress")
 * @param params - 템플릿에 주입할 값들 (예: { current: 2, total: 7 }) — 생략 가능
 * @returns 치환된 최종 문자열
 */
type TranslateKey = string | string[];

export const translate = (
  key: TranslateKey,
  params?: Record<string, string | number | (string | number)[]>
): string => {
  // key가 배열이면 각 항목을 $L로 번역 후 공백으로 join
  if (Array.isArray(key)) {
    return key.map((k) => $L(k)).join(" ");
  }

  const raw = $L(key);

  if (!params) return raw;

  return raw.replace(/{{(.*?)}}/g, (_, match) => {
    const trimmedKey = match.trim();
    const value = params[trimmedKey];

    if (Array.isArray(value)) {
      return value.map(String).join(" ");
    }

    return value?.toString() ?? "";
  });
};

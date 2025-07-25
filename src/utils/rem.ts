/**
 * px 단위를 1rem = 24px 기준으로 calc(...) 문자열로 변환합니다.
 * 예: rem(48) → "calc(48 / 24 * 1rem)" → "2rem"
 */
export const rem = (px: number): string => `calc(${px} / 24 * 1rem)`;

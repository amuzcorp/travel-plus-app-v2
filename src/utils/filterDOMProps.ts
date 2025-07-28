// DOM에서 허용되는 일반 prop만 전달하기 위한 필터 함수
export function filterDOMProps(
  props: Record<string, any>
): Record<string, any> {
  const {
    // React 표준 DOM props
    id,
    className,
    style,
    tabIndex,
    role,
    title,
    onClick,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    onMouseEnter,
    onMouseLeave,
    // data-* 및 aria-* 등 커스텀 속성은 그대로 허용
    ...rest
  } = props;

  // data-*와 aria-* 속성은 유지
  const customProps = Object.entries(rest).reduce((acc, [key, value]) => {
    if (
      key.startsWith("data-") ||
      key.startsWith("aria-") ||
      key.startsWith("$")
    ) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);

  return {
    id,
    className,
    style,
    tabIndex,
    role,
    title,
    onClick,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    onMouseEnter,
    onMouseLeave,
    ...customProps,
  };
}

import { useEffect, useState } from "react";

export function useInputType(): void {
  const [inpytType, setInputType] = useState(InputType.keyboard);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          if (
            (mutation.target as HTMLElement).classList.contains(
              "spotlight-input-mouse"
            )
          ) {
            setInputType(InputType.mouse);
          } else if (
            (mutation.target as HTMLElement).classList.contains(
              "spotlight-input-key"
            )
          ) {
            setInputType(InputType.keyboard);
          }
        }
      });

      const target = document.getElementById("root");

      if (target) {
        observer.observe(target, {
          attributes: true,
          attributeFilter: ["class"],
        });
      }

      return () => observer.disconnect();
    });
  }, []);
}

export const InputType = {
  keyboard: 0,
  mouse: 1,
};

import { useRef } from "react";

export function useDelayedCallback<T>(
  callback: (value: T) => void,
  delay: number = 300
) {
  const timeoutHandle = useRef<NodeJS.Timeout | undefined>();

  function onDelayedChange(nextValue: T) {
    if (!!timeoutHandle.current) {
      clearTimeout(timeoutHandle.current);
    }

    timeoutHandle.current = setTimeout(() => {
      callback(nextValue);
    }, delay);
  }

  return onDelayedChange;
}

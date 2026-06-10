export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  delay = 200
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

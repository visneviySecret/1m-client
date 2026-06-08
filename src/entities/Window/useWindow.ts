import { useEffect, useRef } from "react";

type UseWindowParams = {
  hasNext: boolean;
  loading: boolean;
  onLoadMore: () => void;
};

export function useWindow({ hasNext, loading, onLoadMore }: UseWindowParams) {
  const contentRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNext || loading) {
      return;
    }

    const root = contentRef.current;
    const target = loaderRef.current;

    if (!root || !target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onLoadMore();
        }
      },
      { root, threshold: 0.1 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNext, loading, onLoadMore]);

  return {
    contentRef,
    loaderRef,
  };
}

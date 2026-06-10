"use client";

import { Filter } from "@/entities/Filter/Filter";
import { Loader } from "@/entities/Loader/Loader";
import type { ReactNode } from "react";
import styles from "./Window.module.scss";
import { useWindow } from "./useWindow";

type WindowProps = {
  title: string;
  children: ReactNode;
  hasNext: boolean;
  loading: boolean;
  onLoadMore: () => void;
  filterId: string;
  onFilterIdChange: (value: string) => void;
};

export function Window({
  title,
  children,
  hasNext,
  loading,
  onLoadMore,
  filterId,
  onFilterIdChange,
}: WindowProps) {
  const { contentRef, loaderRef } = useWindow({ hasNext, loading, onLoadMore });

  return (
    <section className={styles.window}>
      <header className={styles.title}>{title}</header>
      <Filter value={filterId} onChange={onFilterIdChange} />
      <div ref={contentRef} className={styles.content}>
        {children}
        {hasNext && <Loader ref={loaderRef} />}
      </div>
    </section>
  );
}

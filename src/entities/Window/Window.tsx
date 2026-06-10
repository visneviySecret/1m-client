"use client";

import { Loader } from "@/entities/Loader/Loader";
import type { ReactNode } from "react";
import styles from "./Window.module.scss";
import { useWindow } from "./useWindow";

type WindowProps = {
  title: string;
  children: ReactNode;
  filter?: ReactNode;
  addPerson?: ReactNode;
  hasNext: boolean;
  loading: boolean;
  onLoadMore: () => void;
};

export function Window({
  title,
  children,
  filter,
  addPerson,
  hasNext,
  loading,
  onLoadMore,
}: WindowProps) {
  const { contentRef, loaderRef } = useWindow({ hasNext, loading, onLoadMore });

  return (
    <section className={styles.window}>
      <header className={styles.title}>{title}</header>
      {filter}
      <div ref={contentRef} className={styles.content}>
        {children}
        {hasNext && <Loader ref={loaderRef} />}
      </div>
      {addPerson}
    </section>
  );
}

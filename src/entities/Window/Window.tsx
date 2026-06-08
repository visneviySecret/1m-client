import type { ReactNode } from "react";
import styles from "./Window.module.scss";

type WindowProps = {
  title: string;
  children: ReactNode;
};

export function Window({ title, children }: WindowProps) {
  return (
    <section className={styles.window}>
      <header className={styles.title}>{title}</header>
      <div className={styles.content}>{children}</div>
    </section>
  );
}

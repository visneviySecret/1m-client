import { Ref } from "react";
import styles from "./Loader.module.scss";

interface LoaderProps {
  ref: Ref<HTMLDivElement> | undefined;
}

export const Loader = ({ ref }: LoaderProps) => {
  return (
    <div ref={ref} className={styles.loader}>
      <div className={styles.spinner} />
    </div>
  );
};

Loader.displayName = "Loader";

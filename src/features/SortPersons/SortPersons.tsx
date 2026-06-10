import styles from "./SortPersons.module.scss";
import { useSortPersons, type PersonsKind } from "./model/useSortPersons";

type SortPersonsProps = {
  kind: PersonsKind;
};

export function SortPersons({ kind }: SortPersonsProps) {
  const { sortOrder, toggle } = useSortPersons(kind);

  return (
    <button type="button" className={styles.button} onClick={toggle}>
      ID {sortOrder === "asc" ? "↑" : "↓"}
    </button>
  );
}

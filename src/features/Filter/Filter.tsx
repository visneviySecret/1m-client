import styles from "./Filter.module.scss";
import { useFilter, type PersonsKind } from "./model/useFilter";

type FilterProps = {
  kind: PersonsKind;
};

export function Filter({ kind }: FilterProps) {
  const { filterId, onChange } = useFilter(kind);

  return (
    <input
      type="number"
      value={filterId}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Filter by id"
      className={styles.input}
    />
  );
}

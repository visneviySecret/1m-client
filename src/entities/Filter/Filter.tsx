import styles from "./Filter.module.scss";

type FilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export function Filter({ value, onChange }: FilterProps) {
  return (
    <input
      type="number"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Filter by id"
      className={styles.input}
    />
  );
}

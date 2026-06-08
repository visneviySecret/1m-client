import type { Person } from "@/api/persons";
import styles from "./PersonList.module.scss";

type PersonListProps = {
  persons: Person[];
  emptyText: string;
};

export function PersonList({ persons, emptyText }: PersonListProps) {
  if (persons.length === 0) {
    return <p className={styles.empty}>{emptyText}</p>;
  }

  return persons.map((person) => (
    <div key={person.id} className={styles.item}>
      {person.name} · {person.age}
    </div>
  ));
}

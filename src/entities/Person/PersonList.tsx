import type { Person } from "@/entities/Person/types.ts";
import styles from "./PersonList.module.scss";

type PersonListProps = {
  persons: Person[];
  emptyText: string;
  onPersonClick: (person: Person) => void;
};

export function PersonList({
  persons,
  emptyText,
  onPersonClick,
}: PersonListProps) {
  if (persons.length === 0) {
    return <p className={styles.empty}>{emptyText}</p>;
  }

  return persons.map((person) => (
    <div
      key={person.id}
      className={styles.item}
      onClick={() => onPersonClick(person)}
    >
      {person.id} · {person.name} · {person.age}
    </div>
  ));
}

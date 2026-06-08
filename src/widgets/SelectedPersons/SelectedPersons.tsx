import type { Person } from "@/api/persons";
import { PersonList } from "@/entities/Person/PersonList";
import { Window } from "@/entities/Window/Window";
import styles from "./SelectedPersons.module.scss";

type SelectedPersonsProps = {
  persons: Person[];
};

export function SelectedPersons({ persons }: SelectedPersonsProps) {
  return (
    <div className={styles.widget}>
      <Window title="Selected">
        <PersonList persons={persons} emptyText="No selected persons" />
      </Window>
    </div>
  );
}

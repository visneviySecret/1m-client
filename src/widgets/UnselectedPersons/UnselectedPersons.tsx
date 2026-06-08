import type { Person } from "@/api/persons";
import { PersonList } from "@/entities/Person/PersonList";
import { Window } from "@/entities/Window/Window";
import styles from "./UnselectedPersons.module.scss";

type UnselectedPersonsProps = {
  persons: Person[];
};

export function UnselectedPersons({ persons }: UnselectedPersonsProps) {
  return (
    <div className={styles.widget}>
      <Window title="Unselected">
        <PersonList persons={persons} emptyText="No unselected persons" />
      </Window>
    </div>
  );
}

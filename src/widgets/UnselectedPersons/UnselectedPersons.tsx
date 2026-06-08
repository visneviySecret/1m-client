import { PersonList } from "@/entities/Person/PersonList";
import { Window } from "@/entities/Window/Window";
import { useAppSelector } from "@/store/hooks";
import { selectUnselectedPersons } from "@/store/persons/personsSelectors";
import styles from "./UnselectedPersons.module.scss";

export function UnselectedPersons() {
  const persons = useAppSelector(selectUnselectedPersons);

  return (
    <div className={styles.widget}>
      <Window title="Unselected">
        <PersonList persons={persons} emptyText="No unselected persons" />
      </Window>
    </div>
  );
}

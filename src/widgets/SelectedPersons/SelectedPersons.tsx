import { PersonList } from "@/entities/Person/PersonList";
import { Window } from "@/entities/Window/Window";
import { useAppSelector } from "@/store/hooks";
import { selectSelectedPersons } from "@/store/persons/personsSelectors";
import styles from "./SelectedPersons.module.scss";

export function SelectedPersons() {
  const persons = useAppSelector(selectSelectedPersons);

  return (
    <div className={styles.widget}>
      <Window title="Selected">
        <PersonList persons={persons} emptyText="No selected persons" />
      </Window>
    </div>
  );
}

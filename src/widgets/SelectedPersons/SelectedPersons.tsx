import { PersonList } from "@/entities/Person/PersonList";
import { Window } from "@/entities/Window/Window";
import { useAppSelector } from "@/store/hooks";
import { selectSelectedPersons } from "@/store/persons/personsSelectors";

export function SelectedPersons() {
  const persons = useAppSelector(selectSelectedPersons);

  return (
    <Window title="Selected">
      <PersonList persons={persons} emptyText="No selected persons" />
    </Window>
  );
}

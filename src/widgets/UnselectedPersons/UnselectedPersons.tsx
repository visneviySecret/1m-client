import { PersonList } from "@/entities/Person/PersonList";
import { Window } from "@/entities/Window/Window";
import { useAppSelector } from "@/store/hooks";
import { selectUnselectedPersons } from "@/store/persons/personsSelectors";

export function UnselectedPersons() {
  const persons = useAppSelector(selectUnselectedPersons);

  return (
    <Window title="Unselected">
      <PersonList persons={persons} emptyText="No unselected persons" />
    </Window>
  );
}

import { PersonList } from "@/entities/Person/PersonList";
import { Window } from "@/entities/Window/Window";
import { AddPerson } from "@/features/AddPerson/AddPerson";
import { Filter } from "@/features/Filter/Filter";
import { usePersons } from "@/store/persons/usePersons";

export function UnselectedPersons() {
  const { persons, hasNext, loading, handleLoadMore, handlePersonClick } =
    usePersons("unselected");

  return (
    <Window
      title="Unselected"
      filter={<Filter kind="unselected" />}
      addPerson={<AddPerson />}
      hasNext={hasNext}
      loading={loading}
      onLoadMore={handleLoadMore}
    >
      <PersonList
        persons={persons}
        emptyText="No unselected persons"
        onPersonClick={handlePersonClick}
      />
    </Window>
  );
}

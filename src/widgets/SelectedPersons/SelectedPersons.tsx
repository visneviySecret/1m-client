import { PersonList } from "@/entities/Person/PersonList";
import { Window } from "@/entities/Window/Window";
import { Filter } from "@/features/Filter/Filter";
import { SortPersons } from "@/features/SortPersons/SortPersons";
import { usePersons } from "@/store/persons/usePersons";

export function SelectedPersons() {
  const { persons, hasNext, loading, handleLoadMore, handlePersonClick } =
    usePersons("selected");

  return (
    <Window
      title="Selected"
      headerAction={<SortPersons kind="selected" />}
      filter={<Filter kind="selected" />}
      hasNext={hasNext}
      loading={loading}
      onLoadMore={handleLoadMore}
    >
      <PersonList
        persons={persons}
        emptyText="No selected persons"
        onPersonClick={handlePersonClick}
      />
    </Window>
  );
}

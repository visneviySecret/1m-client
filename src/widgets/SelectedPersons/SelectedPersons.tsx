import { PersonList } from "@/entities/Person/PersonList";
import { Window } from "@/entities/Window/Window";
import { usePersons } from "@/store/persons/usePersons";

export function SelectedPersons() {
  const { persons, hasNext, loading, handleLoadMore } = usePersons("selected");

  return (
    <Window
      title="Selected"
      hasNext={hasNext}
      loading={loading}
      onLoadMore={handleLoadMore}
    >
      <PersonList persons={persons} emptyText="No selected persons" />
    </Window>
  );
}

import { PersonList } from "@/entities/Person/PersonList";
import { Window } from "@/entities/Window/Window";
import { usePersons } from "@/store/persons/usePersons";

export function UnselectedPersons() {
  const { persons, hasNext, loading, handleLoadMore } = usePersons("unselected");

  return (
    <Window
      title="Unselected"
      hasNext={hasNext}
      loading={loading}
      onLoadMore={handleLoadMore}
    >
      <PersonList persons={persons} emptyText="No unselected persons" />
    </Window>
  );
}

import { PersonList } from "@/entities/Person/PersonList";
import { Window } from "@/entities/Window/Window";
import { usePersons } from "@/store/persons/usePersons";

export function UnselectedPersons() {
  const {
    persons,
    filterId,
    onFilterIdChange,
    hasNext,
    loading,
    handleLoadMore,
  } = usePersons("unselected");

  return (
    <Window
      title="Unselected"
      hasNext={hasNext}
      loading={loading}
      onLoadMore={handleLoadMore}
      filterId={filterId}
      onFilterIdChange={onFilterIdChange}
    >
      <PersonList persons={persons} emptyText="No unselected persons" />
    </Window>
  );
}

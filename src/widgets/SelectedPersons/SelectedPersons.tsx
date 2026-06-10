import { PersonList } from "@/entities/Person/PersonList";
import { Window } from "@/entities/Window/Window";
import { usePersons } from "@/store/persons/usePersons";

export function SelectedPersons() {
  const {
    persons,
    filterId,
    onFilterIdChange,
    hasNext,
    loading,
    handleLoadMore,
  } = usePersons("selected");

  return (
    <Window
      title="Selected"
      hasNext={hasNext}
      loading={loading}
      onLoadMore={handleLoadMore}
      filterId={filterId}
      onFilterIdChange={onFilterIdChange}
    >
      <PersonList persons={persons} emptyText="No selected persons" />
    </Window>
  );
}

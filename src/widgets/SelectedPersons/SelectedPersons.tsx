import { Window } from "@/entities/Window/Window";
import { Filter } from "@/features/Filter/Filter";
import { SelectedPersonList } from "@/features/ReorderSelectedPersons/SelectedPersonList";
import { useReorderSelectedPersons } from "@/features/ReorderSelectedPersons/model/useReorderSelectedPersons";
import { usePersons } from "@/store/persons/usePersons";

export function SelectedPersons() {
  const { persons, hasNext, loading, handleLoadMore, handlePersonClick } =
    usePersons("selected");
  const { handleReorder } = useReorderSelectedPersons(persons);

  return (
    <Window
      title="Selected"
      filter={<Filter kind="selected" />}
      hasNext={hasNext}
      loading={loading}
      onLoadMore={handleLoadMore}
    >
      <SelectedPersonList
        persons={persons}
        emptyText="No selected persons"
        onPersonClick={handlePersonClick}
        onReorder={handleReorder}
      />
    </Window>
  );
}

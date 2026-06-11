import type { Person } from "@/entities/Person/types";
import { useAppDispatch } from "@/store/hooks";
import { reorderSelectedPersons } from "@/store/persons/personsSlice";

export function useReorderSelectedPersons(persons: Person[]) {
  const dispatch = useAppDispatch();

  const handleReorder = (ids: string[]) => {
    const previousIds = persons.map((person) => person.id);

    dispatch(
      reorderSelectedPersons({
        ids,
        previousIds,
      })
    );
  };

  return { handleReorder };
}

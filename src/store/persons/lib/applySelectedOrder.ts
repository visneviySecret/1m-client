import type { Person } from "@/entities/Person/types";
import type { PersonsState } from "../types";

export function applySelectedOrder(state: PersonsState, ids: string[]) {
  const personsMap = new Map(
    state.selected.items.map((person) => [person.id, person])
  );

  state.selected.items = ids
    .map((id) => personsMap.get(id))
    .filter((person): person is Person => person !== undefined);
}

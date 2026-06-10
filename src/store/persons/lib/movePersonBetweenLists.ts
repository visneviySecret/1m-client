import type { Person } from "@/entities/Person/types";
import type { PersonsState } from "../types";
import { sortPersonsById } from "./sortPersonsById";

export function movePersonBetweenLists(state: PersonsState, person: Person) {
  state.unselected.items = state.unselected.items.filter(
    (item) => item.id !== person.id
  );
  state.selected.items = state.selected.items.filter(
    (item) => item.id !== person.id
  );

  if (person.selected) {
    state.selected.items = sortPersonsById([...state.selected.items, person]);
    return;
  }

  state.unselected.items = sortPersonsById([...state.unselected.items, person]);
}

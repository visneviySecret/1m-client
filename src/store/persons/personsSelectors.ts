import type { RootState } from "../store.ts";

export const selectUnselectedPersons = (state: RootState) =>
  state.persons.unselected.items;

export const selectSelectedPersons = (state: RootState) =>
  state.persons.selected.items;

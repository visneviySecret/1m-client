import type { RootState } from "../store";

export const selectUnselectedPersons = (state: RootState) =>
  state.persons.unselected.items;

export const selectSelectedPersons = (state: RootState) =>
  state.persons.selected.items;

export const selectUnselectedHasNext = (state: RootState) =>
  state.persons.unselected.hasNext;

export const selectSelectedHasNext = (state: RootState) =>
  state.persons.selected.hasNext;

export const selectUnselectedLoading = (state: RootState) =>
  state.persons.unselected.loading;

export const selectSelectedLoading = (state: RootState) =>
  state.persons.selected.loading;

export const selectUnselectedPage = (state: RootState) =>
  state.persons.unselected.page;

export const selectSelectedPage = (state: RootState) =>
  state.persons.selected.page;

export const selectUnselectedLimit = (state: RootState) =>
  state.persons.unselected.limit;

export const selectSelectedLimit = (state: RootState) =>
  state.persons.selected.limit;

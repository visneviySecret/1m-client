import type { FetchPersonsParams, Person } from "@/entities/Person/types";

export type PersonsKind = "selected" | "unselected";

export type PersonsListState = {
  items: Person[];
  page: number;
  limit: number;
  hasNext: boolean;
  loading: boolean;
  error: string | null;
  filterId: string;
};

export type PersonsState = {
  unselected: PersonsListState;
  selected: PersonsListState;
};

export type FetchPersonsThunkParams = FetchPersonsParams & {
  kind: PersonsKind;
};

export type ReorderSelectedPersonsPayload = {
  ids: string[];
  previousIds: string[];
};

export type SetFilterIdPayload = {
  kind: PersonsKind;
  filterId: string;
};

export type Person = {
  id: number;
  age: number;
  name: string;
  selected: boolean;
};

export type PersonsPage = {
  items: Person[];
  hasNext: boolean;
};

export type SortOrder = "asc" | "desc";

export type PersonsQueryParams = {
  page?: number;
  limit?: number;
  id?: string;
  sort?: SortOrder;
};

export type FetchPersonsParams = Required<
  Pick<PersonsQueryParams, "page" | "limit">
> &
  Pick<PersonsQueryParams, "id" | "sort">;

export type CreatePersonParams = {
  id: string;
};

export type UpdatePersonSelectedParams = {
  id: number;
  selected: boolean;
};

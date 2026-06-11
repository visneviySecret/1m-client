export type Person = {
  id: string;
  age: number;
  name: string;
  selected: boolean;
};

export type PersonsPage = {
  items: Person[];
  hasNext: boolean;
};

export type PersonsQueryParams = {
  page?: number;
  limit?: number;
  id?: string;
};

export type FetchPersonsParams = Required<
  Pick<PersonsQueryParams, "page" | "limit">
> &
  Pick<PersonsQueryParams, "id">;

export type CreatePersonParams = {
  id: string;
};

export type UpdatePersonSelectedParams = {
  id: string;
  selected: boolean;
};

export type ReorderSelectedPersonsParams = {
  ids: string[];
};

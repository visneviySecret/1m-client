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
  id: number;
  selected: boolean;
};

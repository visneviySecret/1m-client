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
  id?: number;
};

export type FetchPersonsParams = Required<
  Pick<PersonsQueryParams, "page" | "limit">
> &
  Pick<PersonsQueryParams, "id">;

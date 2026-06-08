import { api } from "./config";

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

type GetPersonsParams = {
  page?: number;
  limit?: number;
};

export async function getUnselectedPersons(params: GetPersonsParams = {}) {
  const { data } = await api.get<PersonsPage>("/persons/unselected", { params });
  return data;
}

export async function getSelectedPersons(params: GetPersonsParams = {}) {
  const { data } = await api.get<PersonsPage>("/persons/selected", { params });
  return data;
}

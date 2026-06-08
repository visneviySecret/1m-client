import { api } from "./config";

export type Person = {
  id: number;
  age: number;
  name: string;
  selected: boolean;
};

type GetPersonsParams = {
  page?: number;
  limit?: number;
};

export async function getUnselectedPersons(params: GetPersonsParams = {}) {
  const { data } = await api.get<Person[]>("/persons/unselected", { params });
  return data;
}

export async function getSelectedPersons(params: GetPersonsParams = {}) {
  const { data } = await api.get<Person[]>("/persons/selected", { params });
  return data;
}

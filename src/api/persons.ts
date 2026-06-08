import { api } from "./config";

export type Person = {
  id: number;
  age: number;
  name: string;
};

type GetPersonsParams = {
  page?: number;
  limit?: number;
};

export async function getPersons(params: GetPersonsParams = {}) {
  const { data } = await api.get<Person[]>("/", { params });
  return data;
}

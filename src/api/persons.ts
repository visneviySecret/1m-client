import type {
  CreatePersonParams,
  Person,
  PersonsPage,
  PersonsQueryParams,
  ReorderSelectedPersonsParams,
  UpdatePersonSelectedParams,
} from "@/entities/Person/types";
import { api } from "./config";

export async function getUnselectedPersons(params: PersonsQueryParams = {}) {
  const { data } = await api.get<PersonsPage>("/persons/unselected", {
    params,
  });
  return data;
}

export async function getSelectedPersons(params: PersonsQueryParams = {}) {
  const { data } = await api.get<PersonsPage>("/persons/selected", { params });
  return data;
}

export async function createPerson(params: CreatePersonParams) {
  const { data } = await api.post<Person>("/persons", params);
  return data;
}

export async function updatePersonSelected(params: UpdatePersonSelectedParams) {
  const { data } = await api.patch<Person>(`/persons/${params.id}`, params);
  return data;
}

export async function reorderSelectedPersons(
  params: ReorderSelectedPersonsParams
) {
  await api.put("/persons/selected/order", params);
}

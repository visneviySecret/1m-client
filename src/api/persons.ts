import type { PersonsPage, PersonsQueryParams } from "@/entities/Person/types";
import { api } from "./config";

export async function getUnselectedPersons(params: PersonsQueryParams = {}) {
  const { data } = await api.get<PersonsPage>("/persons/unselected", { params });
  return data;
}

export async function getSelectedPersons(params: PersonsQueryParams = {}) {
  const { data } = await api.get<PersonsPage>("/persons/selected", { params });
  return data;
}

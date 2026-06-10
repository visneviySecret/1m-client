import type { Person } from "@/entities/Person/types";

export function sortPersonsById(persons: Person[]) {
  return [...persons].sort((left, right) => left.id - right.id);
}

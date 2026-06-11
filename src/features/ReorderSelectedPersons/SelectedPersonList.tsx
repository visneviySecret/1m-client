"use client";

import { PersonList } from "@/entities/Person/PersonList";
import type { Person } from "@/entities/Person/types";
import { useSelectedPersonDragDrop } from "./model/useSelectedPersonDragDrop";

type SelectedPersonListProps = {
  persons: Person[];
  emptyText: string;
  onPersonClick: (person: Person) => void;
  onReorder: (ids: string[]) => void;
};

export function SelectedPersonList({
  persons,
  emptyText,
  onPersonClick,
  onReorder,
}: SelectedPersonListProps) {
  const { getItemProps } = useSelectedPersonDragDrop({
    persons,
    onPersonClick,
    onReorder,
  });

  return (
    <PersonList
      persons={persons}
      emptyText={emptyText}
      onPersonClick={onPersonClick}
      getItemProps={getItemProps}
    />
  );
}

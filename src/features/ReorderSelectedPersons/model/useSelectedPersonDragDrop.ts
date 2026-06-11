import type { Person } from "@/entities/Person/types";
import classNames from "classnames";
import { type DragEvent, useRef, useState } from "react";
import styles from "../SelectedPersonList.module.scss";

type UseSelectedPersonDragDropParams = {
  persons: Person[];
  onPersonClick: (person: Person) => void;
  onReorder: (ids: string[]) => void;
};

function reorderPersons(
  persons: Person[],
  fromIndex: number,
  toIndex: number
) {
  const nextPersons = [...persons];
  const [movedPerson] = nextPersons.splice(fromIndex, 1);
  nextPersons.splice(toIndex, 0, movedPerson);
  return nextPersons;
}

export function useSelectedPersonDragDrop({
  persons,
  onPersonClick,
  onReorder,
}: UseSelectedPersonDragDropParams) {
  const dragStartedRef = useRef(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const getItemProps = (person: Person, index: number) => ({
    draggable: true,
    className: classNames(styles.item, {
      [styles.dropTarget]: dropIndex === index,
      [styles.dragging]: dragIndex === index,
    }),
    onDragStart: () => {
      dragStartedRef.current = true;
      setDragIndex(index);
    },
    onDragOver: (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDropIndex(index);
    },
    onDragLeave: () => {
      setDropIndex((current) => (current === index ? null : current));
    },
    onDrop: (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDropIndex(null);

      if (dragIndex === null || dragIndex === index) {
        return;
      }

      onReorder(
        reorderPersons(persons, dragIndex, index).map((item) => item.id)
      );
    },
    onDragEnd: () => {
      setDragIndex(null);
      setDropIndex(null);
      window.setTimeout(() => {
        dragStartedRef.current = false;
      }, 0);
    },
    onClick: () => {
      if (dragStartedRef.current) {
        return;
      }

      onPersonClick(person);
    },
  });

  return { getItemProps };
}

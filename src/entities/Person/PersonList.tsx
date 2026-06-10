import type { Person } from "@/entities/Person/types.ts";
import classNames from "classnames";
import type { HTMLAttributes } from "react";
import styles from "./PersonList.module.scss";

type PersonListItemProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

type PersonListProps = {
  persons: Person[];
  emptyText: string;
  onPersonClick: (person: Person) => void;
  getItemProps?: (person: Person, index: number) => PersonListItemProps;
};

export function PersonList({
  persons,
  emptyText,
  onPersonClick,
  getItemProps,
}: PersonListProps) {
  if (persons.length === 0) {
    return <p className={styles.empty}>{emptyText}</p>;
  }

  return persons.map((person, index) => {
    const itemProps = getItemProps?.(person, index);
    const {
      className: itemClassName,
      onClick: itemOnClick,
      ...restItemProps
    } = itemProps ?? {};

    return (
      <div
        key={person.id}
        className={classNames(styles.item, itemClassName)}
        onClick={itemOnClick ?? (() => onPersonClick(person))}
        {...restItemProps}
      >
        {person.id} · {person.name} · {person.age}
      </div>
    );
  });
}

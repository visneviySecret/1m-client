"use client";
import { getPersons, type Person } from "@/api/persons";
import { SelectedPersons } from "@/widgets/SelectedPersons/SelectedPersons";
import { UnselectedPersons } from "@/widgets/UnselectedPersons/UnselectedPersons";
import { useEffect, useMemo, useState } from "react";
import styles from "./main.module.scss";

export default function Main() {
  const [persons, setPersons] = useState<Person[]>([]);

  const unselected = useMemo(
    () => persons.filter((person) => !person.selected),
    [persons]
  );
  const selected = useMemo(
    () => persons.filter((person) => person.selected),
    [persons]
  );

  async function loadPersons() {
    const data = await getPersons();
    setPersons(data);
  }

  useEffect(() => {
    loadPersons();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <UnselectedPersons persons={unselected} />
        <SelectedPersons persons={selected} />
      </main>
    </div>
  );
}

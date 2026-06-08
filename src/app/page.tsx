"use client";
import { getPersons, type Person } from "@/api/persons";
import { useEffect, useState } from "react";

export default function Home() {
  const [persons, setPersons] = useState<Person[]>([]);

  async function loadPersons() {
    const data = await getPersons();
    setPersons(data);
  }

  useEffect(() => {
    loadPersons();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>Hellow world! {persons.length}</main>
    </div>
  );
}

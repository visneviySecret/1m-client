"use client";

import { useAppDispatch } from "@/store/hooks";
import { fetchPersons } from "@/store/persons/personsSlice";
import { SelectedPersons } from "@/widgets/SelectedPersons/SelectedPersons";
import { UnselectedPersons } from "@/widgets/UnselectedPersons/UnselectedPersons";
import { useEffect } from "react";
import styles from "./MainPage.module.scss";

export function MainPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = { page: 1, limit: 20 };
    dispatch(fetchPersons({ ...params, kind: "unselected" }));
    dispatch(fetchPersons({ ...params, kind: "selected" }));
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <UnselectedPersons />
        <SelectedPersons />
      </main>
    </div>
  );
}

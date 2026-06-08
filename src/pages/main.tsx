"use client";
import { useAppDispatch } from "@/store/hooks";
import {
  fetchSelectedPersons,
  fetchUnselectedPersons,
} from "@/store/persons/personsSlice";
import { SelectedPersons } from "@/widgets/SelectedPersons/SelectedPersons";
import { UnselectedPersons } from "@/widgets/UnselectedPersons/UnselectedPersons";
import { useEffect } from "react";
import styles from "./main.module.scss";

export default function Main() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = { page: 1, limit: 20 };
    dispatch(fetchUnselectedPersons(params));
    dispatch(fetchSelectedPersons(params));
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

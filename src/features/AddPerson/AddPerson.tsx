import styles from "./AddPerson.module.scss";
import { useAddPerson } from "./model/useAddPerson";

export function AddPerson() {
  const { personId, setPersonId, apply, submitting } = useAddPerson();

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        apply();
      }}
    >
      <input
        type="number"
        value={personId}
        onChange={(event) => setPersonId(event.target.value)}
        placeholder="New person id"
        className={styles.input}
      />
      <button type="submit" className={styles.button} disabled={submitting}>
        Apply
      </button>
    </form>
  );
}

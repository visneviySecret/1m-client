import { parseFilterId } from "@/share/lib/parseFilterId";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addPerson,
  fetchUnselectedPersons,
} from "@/store/persons/personsSlice";
import {
  selectUnselectedFilterId,
  selectUnselectedLimit,
} from "@/store/persons/personsSelectors";
import { useState } from "react";

export function useAddPerson() {
  const dispatch = useAppDispatch();
  const limit = useAppSelector(selectUnselectedLimit);
  const filterId = useAppSelector(selectUnselectedFilterId);
  const [personId, setPersonId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const apply = async () => {
    const id = parseFilterId(personId);

    if (id === undefined || submitting) {
      return;
    }

    setSubmitting(true);

    try {
      await dispatch(addPerson(id)).unwrap();
      setPersonId("");
      await dispatch(
        fetchUnselectedPersons({
          page: 1,
          limit,
          id: parseFilterId(filterId),
        })
      ).unwrap();
    } finally {
      setSubmitting(false);
    }
  };

  return {
    personId,
    setPersonId,
    apply,
    submitting,
  };
}

import { getRequestErrorMessage } from "@/share/lib/getRequestErrorMessage";
import { getNotyf } from "@/share/lib/notyf";
import { normalizeIdFilter } from "@/share/lib/parseFilterId";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addPerson, fetchPersons } from "@/store/persons/personsSlice";
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
    const id = normalizeIdFilter(personId);

    if (submitting) {
      return;
    }

    if (!id) {
      getNotyf().error("Enter a person id");
      return;
    }

    setSubmitting(true);

    try {
      await dispatch(addPerson(id)).unwrap();
      setPersonId("");
      await dispatch(
        fetchPersons({
          kind: "unselected",
          page: 1,
          limit,
          id: normalizeIdFilter(filterId),
        })
      ).unwrap();
      getNotyf().success(`Person with id ${id} added`);
    } catch (error) {
      getNotyf().error(getRequestErrorMessage(error));
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

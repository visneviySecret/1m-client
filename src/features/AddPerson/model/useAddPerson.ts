import { getRequestErrorMessage } from "@/share/lib/getRequestErrorMessage";
import { getNotyf } from "@/share/lib/notyf";
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

    if (submitting) {
      return;
    }

    if (id === undefined) {
      getNotyf().error("Enter a valid person id");
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

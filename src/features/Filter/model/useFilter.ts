import { debounce } from "@/share/lib/debounce";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchSelectedPersons,
  fetchUnselectedPersons,
  setFilterId,
} from "@/store/persons/personsSlice";
import {
  selectSelectedFilterId,
  selectSelectedLimit,
  selectUnselectedFilterId,
  selectUnselectedLimit,
} from "@/store/persons/personsSelectors";
import { useCallback, useMemo } from "react";
import { parseFilterId } from "@/share/lib/parseFilterId";

export type PersonsKind = "selected" | "unselected";

const filterConfig = {
  selected: {
    selectFilterId: selectSelectedFilterId,
    selectLimit: selectSelectedLimit,
    fetchPersons: fetchSelectedPersons,
  },
  unselected: {
    selectFilterId: selectUnselectedFilterId,
    selectLimit: selectUnselectedLimit,
    fetchPersons: fetchUnselectedPersons,
  },
} as const;

export function useFilter(kind: PersonsKind) {
  const config = filterConfig[kind];
  const dispatch = useAppDispatch();
  const filterId = useAppSelector(config.selectFilterId);
  const limit = useAppSelector(config.selectLimit);

  const fetchByFilter = useCallback(
    (nextFilterId: string) => {
      dispatch(
        config.fetchPersons({
          page: 1,
          limit,
          id: parseFilterId(nextFilterId),
        })
      );
    },
    [config.fetchPersons, dispatch, limit]
  );

  const debouncedFetchByFilter = useMemo(
    () => debounce(fetchByFilter, 300),
    [fetchByFilter]
  );

  const onChange = useCallback(
    (value: string) => {
      dispatch(setFilterId({ kind, filterId: value }));
      debouncedFetchByFilter(value);
    },
    [debouncedFetchByFilter, dispatch, kind]
  );

  return {
    filterId,
    onChange,
  };
}

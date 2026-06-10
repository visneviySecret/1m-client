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
  selectSelectedSortOrder,
  selectUnselectedFilterId,
  selectUnselectedLimit,
  selectUnselectedSortOrder,
} from "@/store/persons/personsSelectors";
import { useCallback, useMemo } from "react";
import { normalizeIdFilter } from "@/share/lib/parseFilterId";

export type PersonsKind = "selected" | "unselected";

const filterConfig = {
  selected: {
    selectFilterId: selectSelectedFilterId,
    selectLimit: selectSelectedLimit,
    selectSortOrder: selectSelectedSortOrder,
    fetchPersons: fetchSelectedPersons,
  },
  unselected: {
    selectFilterId: selectUnselectedFilterId,
    selectLimit: selectUnselectedLimit,
    selectSortOrder: selectUnselectedSortOrder,
    fetchPersons: fetchUnselectedPersons,
  },
} as const;

export function useFilter(kind: PersonsKind) {
  const config = filterConfig[kind];
  const dispatch = useAppDispatch();
  const filterId = useAppSelector(config.selectFilterId);
  const limit = useAppSelector(config.selectLimit);
  const sortOrder = useAppSelector(config.selectSortOrder);

  const fetchByFilter = useCallback(
    (nextFilterId: string) => {
      dispatch(
        config.fetchPersons({
          page: 1,
          limit,
          id: normalizeIdFilter(nextFilterId),
          sort: sortOrder,
        })
      );
    },
    [config.fetchPersons, dispatch, limit, sortOrder]
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

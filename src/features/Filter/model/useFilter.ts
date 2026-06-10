import { debounce } from "@/share/lib/debounce";
import { normalizeIdFilter } from "@/share/lib/parseFilterId";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { personsConfig } from "@/store/persons/config/personsConfig";
import { fetchPersons, setFilterId } from "@/store/persons/personsSlice";
import type { PersonsKind } from "@/store/persons/types";
import { useCallback, useMemo } from "react";

export type { PersonsKind };

export function useFilter(kind: PersonsKind) {
  const config = personsConfig[kind];
  const dispatch = useAppDispatch();
  const filterId = useAppSelector(config.selectFilterId);
  const limit = useAppSelector(config.selectLimit);

  const fetchByFilter = useCallback(
    (nextFilterId: string) => {
      dispatch(
        fetchPersons({
          kind: config.kind,
          page: 1,
          limit,
          id: normalizeIdFilter(nextFilterId),
        })
      );
    },
    [config.kind, dispatch, limit]
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

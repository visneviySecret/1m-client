import { debounce } from "@/share/lib/debounce";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useState } from "react";
import { fetchSelectedPersons, fetchUnselectedPersons } from "./personsSlice";
import {
  selectSelectedHasNext,
  selectSelectedLimit,
  selectSelectedLoading,
  selectSelectedPage,
  selectSelectedPersons,
  selectUnselectedHasNext,
  selectUnselectedLimit,
  selectUnselectedLoading,
  selectUnselectedPage,
  selectUnselectedPersons,
} from "./personsSelectors";
import { parseFilterId } from "./lib/parse";

type PersonsKind = "selected" | "unselected";

const personsConfig = {
  selected: {
    selectPersons: selectSelectedPersons,
    selectHasNext: selectSelectedHasNext,
    selectLoading: selectSelectedLoading,
    selectPage: selectSelectedPage,
    selectLimit: selectSelectedLimit,
    fetchPersons: fetchSelectedPersons,
  },
  unselected: {
    selectPersons: selectUnselectedPersons,
    selectHasNext: selectUnselectedHasNext,
    selectLoading: selectUnselectedLoading,
    selectPage: selectUnselectedPage,
    selectLimit: selectUnselectedLimit,
    fetchPersons: fetchUnselectedPersons,
  },
} as const;

export function usePersons(kind: PersonsKind) {
  const config = personsConfig[kind];
  const dispatch = useAppDispatch();
  const persons = useAppSelector(config.selectPersons);
  const hasNext = useAppSelector(config.selectHasNext);
  const loading = useAppSelector(config.selectLoading);
  const page = useAppSelector(config.selectPage);
  const limit = useAppSelector(config.selectLimit);
  const [filterId, setFilterId] = useState("");

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

  const onFilterIdChange = (value: string) => {
    setFilterId(value);
    debouncedFetchByFilter(value);
  };

  const handleLoadMore = () => {
    if (loading || !hasNext) {
      return;
    }

    dispatch(
      config.fetchPersons({
        page: page + 1,
        limit,
        id: parseFilterId(filterId),
      })
    );
  };

  return {
    persons,
    filterId,
    onFilterIdChange,
    hasNext,
    loading,
    handleLoadMore,
  };
}

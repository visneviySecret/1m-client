import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import {
  fetchSelectedPersons,
  fetchUnselectedPersons,
} from "./personsSlice";
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

  const handleLoadMore = useCallback(() => {
    if (loading || !hasNext) {
      return;
    }

    dispatch(config.fetchPersons({ page: page + 1, limit }));
  }, [config.fetchPersons, dispatch, hasNext, limit, loading, page]);

  return {
    persons,
    hasNext,
    loading,
    handleLoadMore,
  };
}

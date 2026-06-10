import { parseFilterId } from "@/share/lib/parseFilterId";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Person } from "@/entities/Person/types";
import { fetchSelectedPersons, fetchUnselectedPersons, togglePersonSelected } from "./personsSlice";
import {
  selectSelectedFilterId,
  selectSelectedHasNext,
  selectSelectedLimit,
  selectSelectedLoading,
  selectSelectedPage,
  selectSelectedPersons,
  selectUnselectedFilterId,
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
    selectFilterId: selectSelectedFilterId,
    fetchPersons: fetchSelectedPersons,
  },
  unselected: {
    selectPersons: selectUnselectedPersons,
    selectHasNext: selectUnselectedHasNext,
    selectLoading: selectUnselectedLoading,
    selectPage: selectUnselectedPage,
    selectLimit: selectUnselectedLimit,
    selectFilterId: selectUnselectedFilterId,
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
  const filterId = useAppSelector(config.selectFilterId);

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

  const handlePersonClick = (person: Person) => {
    dispatch(togglePersonSelected(person));
  };

  return {
    persons,
    hasNext,
    loading,
    handleLoadMore,
    handlePersonClick,
  };
}

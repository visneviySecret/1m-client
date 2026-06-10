import { normalizeIdFilter } from "@/share/lib/parseFilterId";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Person } from "@/entities/Person/types";
import { fetchPersons, togglePersonSelected } from "./personsSlice";
import { personsConfig, type PersonsKind } from "./config/personsConfig";

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
      fetchPersons({
        kind: config.kind,
        page: page + 1,
        limit,
        id: normalizeIdFilter(filterId),
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

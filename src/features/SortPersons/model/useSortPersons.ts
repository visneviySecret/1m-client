import { normalizeIdFilter } from "@/share/lib/parseFilterId";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchSelectedPersons,
  fetchUnselectedPersons,
  setSortOrder,
} from "@/store/persons/personsSlice";
import {
  selectSelectedFilterId,
  selectSelectedLimit,
  selectSelectedSortOrder,
  selectUnselectedFilterId,
  selectUnselectedLimit,
  selectUnselectedSortOrder,
} from "@/store/persons/personsSelectors";

export type PersonsKind = "selected" | "unselected";

const sortConfig = {
  selected: {
    selectSortOrder: selectSelectedSortOrder,
    selectLimit: selectSelectedLimit,
    selectFilterId: selectSelectedFilterId,
    fetchPersons: fetchSelectedPersons,
  },
  unselected: {
    selectSortOrder: selectUnselectedSortOrder,
    selectLimit: selectUnselectedLimit,
    selectFilterId: selectUnselectedFilterId,
    fetchPersons: fetchUnselectedPersons,
  },
} as const;

export function useSortPersons(kind: PersonsKind) {
  const config = sortConfig[kind];
  const dispatch = useAppDispatch();
  const sortOrder = useAppSelector(config.selectSortOrder);
  const limit = useAppSelector(config.selectLimit);
  const filterId = useAppSelector(config.selectFilterId);

  const toggle = () => {
    const nextSortOrder = sortOrder === "asc" ? "desc" : "asc";

    dispatch(setSortOrder({ kind, sortOrder: nextSortOrder }));
    dispatch(
      config.fetchPersons({
        page: 1,
        limit,
        id: normalizeIdFilter(filterId),
        sort: nextSortOrder,
      })
    );
  };

  return {
    sortOrder,
    toggle,
  };
}

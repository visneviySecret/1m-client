import {
  fetchSelectedPersons,
  fetchUnselectedPersons,
} from "../personsSlice";
import {
  selectSelectedFilterId,
  selectSelectedHasNext,
  selectSelectedLimit,
  selectSelectedLoading,
  selectSelectedPage,
  selectSelectedPersons,
  selectSelectedSortOrder,
  selectUnselectedFilterId,
  selectUnselectedHasNext,
  selectUnselectedLimit,
  selectUnselectedLoading,
  selectUnselectedPage,
  selectUnselectedPersons,
  selectUnselectedSortOrder,
} from "../personsSelectors";

export type PersonsKind = "selected" | "unselected";

export const personsConfig = {
  selected: {
    selectPersons: selectSelectedPersons,
    selectHasNext: selectSelectedHasNext,
    selectLoading: selectSelectedLoading,
    selectPage: selectSelectedPage,
    selectLimit: selectSelectedLimit,
    selectFilterId: selectSelectedFilterId,
    selectSortOrder: selectSelectedSortOrder,
    fetchPersons: fetchSelectedPersons,
  },
  unselected: {
    selectPersons: selectUnselectedPersons,
    selectHasNext: selectUnselectedHasNext,
    selectLoading: selectUnselectedLoading,
    selectPage: selectUnselectedPage,
    selectLimit: selectUnselectedLimit,
    selectFilterId: selectUnselectedFilterId,
    selectSortOrder: selectUnselectedSortOrder,
    fetchPersons: fetchUnselectedPersons,
  },
} as const;

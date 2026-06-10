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
  selectUnselectedFilterId,
  selectUnselectedHasNext,
  selectUnselectedLimit,
  selectUnselectedLoading,
  selectUnselectedPage,
  selectUnselectedPersons,
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

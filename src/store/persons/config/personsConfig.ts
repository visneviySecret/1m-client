import type { Person } from "@/entities/Person/types";
import type { RootState } from "../../store";
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
import type { PersonsKind } from "../types";

export type { PersonsKind };

type PersonsKindConfig = {
  kind: PersonsKind;
  selectPersons: (state: RootState) => Person[];
  selectHasNext: (state: RootState) => boolean;
  selectLoading: (state: RootState) => boolean;
  selectPage: (state: RootState) => number;
  selectLimit: (state: RootState) => number;
  selectFilterId: (state: RootState) => string;
};

export const personsConfig = {
  selected: {
    kind: "selected",
    selectPersons: selectSelectedPersons,
    selectHasNext: selectSelectedHasNext,
    selectLoading: selectSelectedLoading,
    selectPage: selectSelectedPage,
    selectLimit: selectSelectedLimit,
    selectFilterId: selectSelectedFilterId,
  },
  unselected: {
    kind: "unselected",
    selectPersons: selectUnselectedPersons,
    selectHasNext: selectUnselectedHasNext,
    selectLoading: selectUnselectedLoading,
    selectPage: selectUnselectedPage,
    selectLimit: selectUnselectedLimit,
    selectFilterId: selectUnselectedFilterId,
  },
} satisfies Record<PersonsKind, PersonsKindConfig>;

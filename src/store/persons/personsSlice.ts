import {
  createPerson as createPersonRequest,
  getSelectedPersons,
  getUnselectedPersons,
  updatePersonSelected as updatePersonSelectedRequest,
} from "@/api/persons";
import type { FetchPersonsParams, Person } from "@/entities/Person/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type PersonsListState = {
  items: Person[];
  page: number;
  limit: number;
  hasNext: boolean;
  loading: boolean;
  error: string | null;
  filterId: string;
};

type PersonsState = {
  unselected: PersonsListState;
  selected: PersonsListState;
};

const createInitialListState = (): PersonsListState => ({
  items: [],
  page: 1,
  limit: 20,
  hasNext: true,
  loading: false,
  error: null,
  filterId: "",
});

const initialState: PersonsState = {
  unselected: createInitialListState(),
  selected: createInitialListState(),
};

export const fetchUnselectedPersons = createAsyncThunk(
  "persons/fetchUnselectedPersons",
  async (params: FetchPersonsParams) => {
    return getUnselectedPersons(params);
  }
);

export const fetchSelectedPersons = createAsyncThunk(
  "persons/fetchSelectedPersons",
  async (params: FetchPersonsParams) => {
    return getSelectedPersons(params);
  }
);

export const addPerson = createAsyncThunk(
  "persons/addPerson",
  async (id: number) => {
    return createPersonRequest({ id });
  }
);

export const togglePersonSelected = createAsyncThunk(
  "persons/togglePersonSelected",
  async (person: Person) => {
    return updatePersonSelectedRequest({
      id: person.id,
      selected: !person.selected,
    });
  }
);

function sortPersonsById(persons: Person[]) {
  return [...persons].sort((left, right) => left.id - right.id);
}

function movePersonBetweenLists(state: PersonsState, person: Person) {
  state.unselected.items = state.unselected.items.filter(
    (item) => item.id !== person.id
  );
  state.selected.items = state.selected.items.filter(
    (item) => item.id !== person.id
  );

  if (person.selected) {
    state.selected.items = sortPersonsById([...state.selected.items, person]);
    return;
  }

  state.unselected.items = sortPersonsById([...state.unselected.items, person]);
}

const personsSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    setFilterId: (
      state,
      action: {
        payload: { kind: keyof PersonsState; filterId: string };
      }
    ) => {
      state[action.payload.kind].filterId = action.payload.filterId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnselectedPersons.pending, (state) => {
        state.unselected.loading = true;
        state.unselected.error = null;
      })
      .addCase(fetchUnselectedPersons.fulfilled, (state, action) => {
        const { page, limit } = action.meta.arg;
        state.unselected.loading = false;
        state.unselected.page = page;
        state.unselected.limit = limit;
        state.unselected.hasNext = action.payload.hasNext;
        state.unselected.items =
          page === 1
            ? action.payload.items
            : [...state.unselected.items, ...action.payload.items];
      })
      .addCase(fetchUnselectedPersons.rejected, (state, action) => {
        state.unselected.loading = false;
        state.unselected.error =
          action.error.message ?? "Failed to fetch unselected persons";
      })
      .addCase(fetchSelectedPersons.pending, (state) => {
        state.selected.loading = true;
        state.selected.error = null;
      })
      .addCase(fetchSelectedPersons.fulfilled, (state, action) => {
        const { page, limit } = action.meta.arg;
        state.selected.loading = false;
        state.selected.page = page;
        state.selected.limit = limit;
        state.selected.hasNext = action.payload.hasNext;
        state.selected.items =
          page === 1
            ? action.payload.items
            : [...state.selected.items, ...action.payload.items];
      })
      .addCase(fetchSelectedPersons.rejected, (state, action) => {
        state.selected.loading = false;
        state.selected.error =
          action.error.message ?? "Failed to fetch selected persons";
      })
      .addCase(addPerson.rejected, (state, action) => {
        state.unselected.error = action.error.message ?? "Failed to add person";
      })
      .addCase(togglePersonSelected.pending, (state, action) => {
        const person = action.meta.arg;

        movePersonBetweenLists(state, {
          ...person,
          selected: !person.selected,
        });
      })
      .addCase(togglePersonSelected.rejected, (state, action) => {
        movePersonBetweenLists(state, action.meta.arg);
      });
  },
});

export const { setFilterId } = personsSlice.actions;

export default personsSlice.reducer;

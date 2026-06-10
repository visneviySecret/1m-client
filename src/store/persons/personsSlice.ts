import {
  createPerson as createPersonRequest,
  reorderSelectedPersons as reorderSelectedPersonsRequest,
  updatePersonSelected as updatePersonSelectedRequest,
} from "@/api/persons";
import type { Person } from "@/entities/Person/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addFetchPersonsHandlers } from "./lib/addFetchPersonsHandlers";
import { applySelectedOrder } from "./lib/applySelectedOrder";
import { movePersonBetweenLists } from "./lib/movePersonBetweenLists";
import type {
  PersonsListState,
  PersonsState,
  ReorderSelectedPersonsPayload,
  SetFilterIdPayload,
} from "./types";

export { fetchPersons } from "./thunks/fetchPersons";

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

export const addPerson = createAsyncThunk(
  "persons/addPerson",
  async (id: string) => {
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

export const reorderSelectedPersons = createAsyncThunk(
  "persons/reorderSelectedPersons",
  async (payload: ReorderSelectedPersonsPayload) => {
    await reorderSelectedPersonsRequest({ ids: payload.ids });
    return payload.ids;
  }
);

const personsSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    setFilterId: (state, action: { payload: SetFilterIdPayload }) => {
      state[action.payload.kind].filterId = action.payload.filterId;
    },
  },
  extraReducers: (builder) => {
    addFetchPersonsHandlers(builder);

    builder
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
      })
      .addCase(reorderSelectedPersons.pending, (state, action) => {
        applySelectedOrder(state, action.meta.arg.ids);
      })
      .addCase(reorderSelectedPersons.rejected, (state, action) => {
        applySelectedOrder(state, action.meta.arg.previousIds);
      });
  },
});

export const { setFilterId } = personsSlice.actions;

export default personsSlice.reducer;

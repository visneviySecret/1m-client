import {
  getSelectedPersons,
  getUnselectedPersons,
  type Person,
} from "@/api/persons";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type PersonsListState = {
  items: Person[];
  page: number;
  limit: number;
  hasNext: boolean;
  loading: boolean;
  error: string | null;
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
});

const initialState: PersonsState = {
  unselected: createInitialListState(),
  selected: createInitialListState(),
};

export const fetchUnselectedPersons = createAsyncThunk(
  "persons/fetchUnselectedPersons",
  async ({ page, limit }: { page: number; limit: number }) => {
    return getUnselectedPersons({ page, limit });
  }
);

export const fetchSelectedPersons = createAsyncThunk(
  "persons/fetchSelectedPersons",
  async ({ page, limit }: { page: number; limit: number }) => {
    return getSelectedPersons({ page, limit });
  }
);

const personsSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {},
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
        state.unselected.items = [
          ...state.unselected.items,
          ...action.payload.items,
        ];
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
        state.selected.items = [
          ...state.selected.items,
          ...action.payload.items,
        ];
      })
      .addCase(fetchSelectedPersons.rejected, (state, action) => {
        state.selected.loading = false;
        state.selected.error =
          action.error.message ?? "Failed to fetch selected persons";
      });
  },
});

export default personsSlice.reducer;

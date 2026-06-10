import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { fetchPersons } from "../thunks/fetchPersons";
import type { PersonsState } from "../types";

export function addFetchPersonsHandlers(
  builder: ActionReducerMapBuilder<PersonsState>
) {
  builder
    .addCase(fetchPersons.pending, (state, action) => {
      const { kind } = action.meta.arg;
      state[kind].loading = true;
      state[kind].error = null;
    })
    .addCase(fetchPersons.fulfilled, (state, action) => {
      const { kind, page, limit } = action.meta.arg;
      state[kind].loading = false;
      state[kind].page = page;
      state[kind].limit = limit;
      state[kind].hasNext = action.payload.hasNext;
      state[kind].items =
        page === 1
          ? action.payload.items
          : [...state[kind].items, ...action.payload.items];
    })
    .addCase(fetchPersons.rejected, (state, action) => {
      const { kind } = action.meta.arg;
      state[kind].loading = false;
      state[kind].error =
        action.error.message ?? `Failed to fetch ${kind} persons`;
    });
}

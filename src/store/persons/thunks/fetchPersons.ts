import {
  getSelectedPersons,
  getUnselectedPersons,
} from "@/api/persons";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FetchPersonsThunkParams } from "../types";

export const fetchPersons = createAsyncThunk(
  "persons/fetchPersons",
  async (params: FetchPersonsThunkParams) => {
    const fetcher =
      params.kind === "selected" ? getSelectedPersons : getUnselectedPersons;

    return fetcher(params);
  }
);

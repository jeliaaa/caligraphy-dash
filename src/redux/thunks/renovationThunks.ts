import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRenovations, fetchRenovationsSingle } from "../../api/renovations";
import { Renovation } from "../../types/api";

export const fetchRenovationsThunk = createAsyncThunk<Renovation[]>(
    'renovation/fetchRenovations',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchRenovations();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const fetchRenovationSingleThunk = createAsyncThunk<Renovation, string>(
    'renovation/fetchRenovationSingle',
    async (trackId, { rejectWithValue }) => {
        try {
            return await fetchRenovationsSingle(trackId);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
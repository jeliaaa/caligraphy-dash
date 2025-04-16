import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStages } from "../../api/stages";
import { Stage } from "../../types/api";


export const fetchStagesThunk = createAsyncThunk<Stage[], number>(
    'stage/fetchStagesThunk',
    async (trackId, { rejectWithValue }) => {
        try {
            return await fetchStages(trackId);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
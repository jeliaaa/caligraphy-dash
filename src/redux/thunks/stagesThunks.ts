import { createAsyncThunk } from "@reduxjs/toolkit";
import { completeStage, fetchStages } from "../../api/stages";
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

export const completeStageThunk = createAsyncThunk<Stage, { stageId: number, formData: FormData }>(
    'stage/completeStageThunk',
    async ({ stageId, formData }, { rejectWithValue }) => {
        try {
            return await completeStage(stageId, formData);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
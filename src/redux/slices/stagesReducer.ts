import { createSlice } from '@reduxjs/toolkit';
import { Stage } from '../../types/api';
import { fetchStagesThunk } from '../thunks/stagesThunks';

interface InitialState {
    data: Stage[] | [];
    singleData: Stage | null;
    stagesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: InitialState = {
    data: [],
    singleData: null,
    stagesStatus: 'idle',
};

const stagesSlice = createSlice({
    name: 'stage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStagesThunk.pending, (state) => {
                state.stagesStatus = 'loading';
                state.data = [];
            })
            .addCase(fetchStagesThunk.fulfilled, (state, action) => {
                state.stagesStatus = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchStagesThunk.rejected, (state) => {
                state.stagesStatus = 'failed';
                state.data = [];
            })
    }
});

export default stagesSlice.reducer;
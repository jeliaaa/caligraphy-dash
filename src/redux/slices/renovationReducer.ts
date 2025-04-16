import { createSlice } from '@reduxjs/toolkit';
import { Renovation } from '../../types/api';
import { fetchRenovationSingleThunk, fetchRenovationsThunk } from '../thunks/renovationThunks';

interface InitialState {
    data: Renovation[] | [];
    singleData: Renovation | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: InitialState = {
    data: [],
    singleData: null,
    status: 'idle',
};

const renovationSlice = createSlice({
    name: 'renovation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRenovationsThunk.pending, (state) => {
                state.status = 'loading';
                state.data = [];
            })
            .addCase(fetchRenovationsThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchRenovationsThunk.rejected, (state) => {
                state.status = 'failed';
                state.data = [];
            })
            .addCase(fetchRenovationSingleThunk.pending, (state) => {
                state.status = 'loading';
                state.singleData = null;
            })
            .addCase(fetchRenovationSingleThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.singleData = action.payload;
            })
            .addCase(fetchRenovationSingleThunk.rejected, (state) => {
                state.status = 'failed';
                state.singleData = null;
            })
    }
});

export default renovationSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { Renovation } from '../../types/api';
import { fetchRenovationsThunk } from '../thunks/renovationThunks';

interface InitialState {
    data: Renovation[] | [];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: InitialState = {
    data: [],
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
    }
});

export default renovationSlice.reducer;
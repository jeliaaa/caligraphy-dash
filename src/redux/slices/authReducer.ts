import { createSlice } from '@reduxjs/toolkit';
import {
    fetchSupervisorProfile,
    fetchSupervisorLogin,
    fetchSupervisorLogout
} from '../thunks/authThunks';
import { Supervisor } from '../../types/api';

interface InitialState {
    data: Supervisor | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: InitialState = {
    data: null,
    status: 'idle',
};

const authSlice = createSlice({
    name: 'supervisor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSupervisorLogin.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchSupervisorLogin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchSupervisorLogin.rejected, (state) => {
                state.status = 'failed';
                state.data = null;
            })
            .addCase(fetchSupervisorProfile.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchSupervisorProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchSupervisorProfile.rejected, (state) => {
                state.status = 'failed';
                state.data = null;
            })
            .addCase(fetchSupervisorLogout.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchSupervisorLogout.fulfilled, (state) => {
                state.status = 'succeeded';
                state.data = null;
            })
            .addCase(fetchSupervisorLogout.rejected, (state) => {
                state.status = 'failed';
                state.data = null;
            })

    }
});

export default authSlice.reducer;
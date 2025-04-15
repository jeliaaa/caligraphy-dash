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
            .addCase(fetchSupervisorProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchSupervisorLogout.rejected, (state) => {
                state.status = 'failed';
                state.data = null;
            })

    }
});

export default authSlice.reducer;
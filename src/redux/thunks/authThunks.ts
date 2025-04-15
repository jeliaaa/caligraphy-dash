import { createAsyncThunk } from "@reduxjs/toolkit";
import { Supervisor } from "../../types/api";
import { supervisorLogin, supervisorLogout, supervisorProfile } from "../../api/auth";

export const fetchSupervisorLogin = createAsyncThunk<Supervisor, { email: string; password: string }>(
    'supervisor/fetchSupervisorLogin',
    async (credentials, { rejectWithValue }) => {
        try {
            return await supervisorLogin(credentials.email, credentials.password);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchSupervisorProfile = createAsyncThunk<Supervisor>(
    'supervisor/fetchSupervisorProfile',
    async (_, { rejectWithValue }) => {
        try {
            return await supervisorProfile();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchSupervisorLogout = createAsyncThunk<void>(
    'supervisor/fetchSupervisorLogout',
    async (_, { rejectWithValue }) => {
        try {
            return await supervisorLogout();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

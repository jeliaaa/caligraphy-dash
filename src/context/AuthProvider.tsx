import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchSupervisorLogin, fetchSupervisorLogout, fetchSupervisorProfile } from '../redux/thunks/authThunks';
import { unwrapResult } from '@reduxjs/toolkit';
import { AuthContext } from './AuthContext';
import { Supervisor } from '../types/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState<Supervisor | null>(null);
    const status = useSelector((state: RootState) => state.auth.status);

    const isAuthenticated = !!user;

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const result = await dispatch(fetchSupervisorProfile());
                const payload = unwrapResult(result);
                setUser(payload);
            } catch (error) {
                console.warn('Profile Fetch Error:', error);
            }
        };

        if (!user && status === 'idle') {
            loadProfile();
        }
    }, [dispatch, user, status]);

    const login = async (email: string, password: string) => {
        const result = await dispatch(fetchSupervisorLogin({ email, password }));
        const payload = unwrapResult(result);
        setUser(payload);
    };

    const logout = async () => {
        await dispatch(fetchSupervisorLogout());
        setUser(null);
        window.location.href = '/'
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, status }
        }>
            {children}
        </AuthContext.Provider>
    );
};



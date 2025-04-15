import { createContext } from 'react';
import { Supervisor } from '../types/api';

export interface AuthContextType {
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    user: Supervisor | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authReducer"
import renovationReducer from "./slices/renovationReducer"
const store = configureStore({
    reducer: {
        auth: authReducer,
        renovation: renovationReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
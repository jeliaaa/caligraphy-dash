import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authReducer"
import renovationReducer from "./slices/renovationReducer"
import stagesReducer from "./slices/stagesReducer"
const store = configureStore({
    reducer: {
        auth: authReducer,
        renovation: renovationReducer,
        stage: stagesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
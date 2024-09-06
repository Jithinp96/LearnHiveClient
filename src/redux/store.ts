import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './slices/studentSlice';

export const store = configureStore({
    reducer: {
        student: studentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
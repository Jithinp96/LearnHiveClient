import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import studentReducer from './slices/studentSlice';
import tutorReducer from './slices/tutorSlice';
import adminReducer from './slices/adminSlice';

const studentPersistConfig = {
    key: 'student',
    storage,
};
  
const tutorPersistConfig = {
    key: 'tutor',
    storage,
};
  
const adminPersistConfig = {
    key: 'admin',
    storage,
};
  
const persistedStudentReducer = persistReducer(studentPersistConfig, studentReducer);
const persistedTutorReducer = persistReducer(tutorPersistConfig, tutorReducer);
const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);

export const store = configureStore({
    reducer: {
        student: persistedStudentReducer,
        tutor: persistedTutorReducer,
        admin: persistedAdminReducer,
    },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
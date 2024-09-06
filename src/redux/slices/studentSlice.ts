import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface StudentState {
    loading: boolean;
    error: string | null;
}

const initialState: StudentState = {
    loading: false,
    error: null,
};

export const registerStudent = createAsyncThunk(
    'student/register',
    async (studentData: { name: string; email: string; mobile: number; password: string }) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/students/register`, studentData);
        return response.data;
    }
);

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerStudent.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to register';
            });
    },
});

export default studentSlice.reducer;
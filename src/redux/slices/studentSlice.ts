import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StudentState {
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    studentInfo: { name: string; email: string, studentId: string, role: string } | null; 
}

const initialState: StudentState = {
    loading: false,
    error: null,
    isAuthenticated: false,
    studentInfo: null,
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
      logoutStudent: (state) => {
        state.isAuthenticated = false;
        state.studentInfo = null;
      },
      loginSuccess(state, action: PayloadAction<any>) {
        state.loading = false;
        state.isAuthenticated = true;
        state.studentInfo = action.payload;
    },
    },
  });
  

export const { logoutStudent, loginSuccess } = studentSlice.actions;

export default studentSlice.reducer;
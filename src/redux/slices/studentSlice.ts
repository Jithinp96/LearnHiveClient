import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StudentState {
    studentLoading: boolean;
    studentError: string | null;
    isStudentAuthenticated: boolean;
    studentInfo: { _id: string, name: string; email: string, studentId: string, mobile: number, role: string, isBlocked: boolean } | null; 
}

const initialState: StudentState = {
    studentLoading: false,
    studentError: null,
    isStudentAuthenticated: false,
    studentInfo: null,
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
      logoutStudent: (state) => {
        state.isStudentAuthenticated = false;
        state.studentInfo = null;
      },
      studentLoginSuccess(state, action: PayloadAction<any>) {
        state.studentLoading = false;
        state.isStudentAuthenticated = true;
        state.studentInfo = action.payload;
    },
    },
  });
  

export const { logoutStudent, studentLoginSuccess } = studentSlice.actions;

export default studentSlice.reducer;
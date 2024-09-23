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

// export const loginStudent = createAsyncThunk(
//     'student/login',
//     async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
//         try {
//             const response = await loginStudentAPI(email, password);
//             if (response && response.data) {
//                 return response.data.student;
//             } else {
//                 throw new Error('Login failed');
//             }
//         } catch (error) {
//                 return rejectWithValue(error || 'Login failed');
//         }
//     }
// );

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
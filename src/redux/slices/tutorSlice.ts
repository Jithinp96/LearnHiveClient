import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TutorState {
  tutorLoading: boolean;
  tutorError: string | null;
  isTutorAuthenticated: boolean;
  tutorInfo: { _id: string, name: string; email: string; tutorId: string; role: string, isBlocked: boolean } | null;
}

const initialState: TutorState = {
  tutorLoading: false,
  tutorError: null,
  isTutorAuthenticated: false,
  tutorInfo: null,
};

const tutorSlice = createSlice({
  name: 'tutor',
  initialState,
  reducers: {
    logoutTutor: (state) => {
      state.isTutorAuthenticated = false;
      state.tutorInfo = null;
    },
    tutorLoginSuccess(state, action: PayloadAction<any>) {
      state.tutorLoading = false;
      state.isTutorAuthenticated = true;
      state.tutorInfo = action.payload;
    },
    setTutorLoading(state, action: PayloadAction<boolean>) {
      state.tutorLoading = action.payload;
    },
    setTurorError(state, action: PayloadAction<string | null>) {
      state.tutorError = action.payload;
    },
  },
});

export const { logoutTutor, tutorLoginSuccess, setTutorLoading, setTurorError } = tutorSlice.actions;

export default tutorSlice.reducer;
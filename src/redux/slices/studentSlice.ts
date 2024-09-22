import { createSlice } from '@reduxjs/toolkit';


export interface StudentState {
    loading: boolean;
    error: string | null;
}

const initialState: StudentState = {
    loading: false,
    error: null,
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {},
});

export default studentSlice.reducer;
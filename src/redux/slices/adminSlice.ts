import { createSlice } from "@reduxjs/toolkit";

interface AdminState {
    token: string | null;
}

const initialState: AdminState = {
    token: null
}

const adminSlice = createSlice ({
    name: 'admin',
    initialState,
    reducers: {
        setAdminToken: (state, action) => {
            state.token = action.payload;
        },
        clearAdminToken: (state) => {
            state.token = null;
        }
    }
})

export const { setAdminToken, clearAdminToken } = adminSlice.actions;
export default adminSlice.reducer;
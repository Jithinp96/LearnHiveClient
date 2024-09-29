// import { createSlice } from "@reduxjs/toolkit";

// interface AdminState {
//     token: string | null;
// }

// const initialState: AdminState = {
//     token: null
// }

// const adminSlice = createSlice ({
//     name: 'admin',
//     initialState,
//     reducers: {
//         setAdminToken: (state, action) => {
//             state.token = action.payload;
//         },
//         clearAdminToken: (state) => {
//             state.token = null;
//         }
//     }
// })

// export const { setAdminToken, clearAdminToken } = adminSlice.actions;
// export default adminSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  loading: boolean;
  error: string | null;
  isAdminAuthenticated: boolean;
  token: string | null;
  adminInfo: { email: string; role: string } | null;
}

const initialState: AdminState = {
  loading: false,
  error: null,
  isAdminAuthenticated: false,
  token: null,
  adminInfo: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAdminAuthenticated = true;
    },
    clearAdminToken: (state) => {
      state.token = null;
      state.isAdminAuthenticated = false;
      state.adminInfo = null;
    },
    setAdminInfo: (state, action: PayloadAction<{ email: string; role: string }>) => {
      state.adminInfo = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setAdminToken, clearAdminToken, setAdminInfo, setLoading, setError } = adminSlice.actions;
export default adminSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: null,
    token: null,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearUser: (state) => {
            state.userData = null;
            state.token = null;
            state.error = null;
        },
    },
});

export const { setUser, setToken, setError, clearUser } = userSlice.actions;

export default userSlice.reducer;
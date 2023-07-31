import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: {},
	tokenValue: null,
	error: null,
};

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			// console.log('actionPayload', action.payload);
			state.value = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
		clearUser: (state) => {
			state.value = null;
			state.tokenValue = null;
			state.error = null;
		},
	},
});

export const { setUser, setToken, setError, clearUser } = user.actions;
// exporte les details de l'utilisateur
export const selectUserData = (state) => state.user.value;
export default user.reducer;

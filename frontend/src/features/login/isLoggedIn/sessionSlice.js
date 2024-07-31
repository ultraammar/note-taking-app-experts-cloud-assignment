import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
      isLoggedIn: false,
      email: null,
      name: null,
  },
  reducers: { 
    setSession: (state, action) => {
      const { isLoggedIn, email, name } = action.payload;
      state.isLoggedIn = isLoggedIn;
      state.email = email;
      state.name = name;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = null;
      state.email = null;
    }
  },
});

export const { setSession, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
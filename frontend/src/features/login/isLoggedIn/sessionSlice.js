import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
      isLoggedIn: true, //change it false later after testing, for now it's true
      username: null,
  },
  reducers: { 
    setSession: (state, action) => {
      const { isLoggedIn, username } = action.payload;
      state.isLoggedIn = isLoggedIn;
      state.username = username;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
    }
  },
});

export const { setSession, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
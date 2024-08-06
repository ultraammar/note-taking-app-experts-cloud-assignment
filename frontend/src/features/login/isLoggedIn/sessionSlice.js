import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
      isLoggedIn: false, //change it false later after testing, for now it's true
      username: null,
      user_id: null,
  },
  reducers: { 
    setSession: (state, action) => {
      const { isLoggedIn, username, user_id } = action.payload;
      state.isLoggedIn = isLoggedIn;
      state.username = username;
      state.user_id = user_id;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
      state.user_id = null;
    }
  },
});

export const { setSession, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
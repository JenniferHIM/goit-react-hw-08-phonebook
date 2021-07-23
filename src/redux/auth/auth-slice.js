import { createSlice } from '@reduxjs/toolkit';
import {
  userRegisterRequest,
  userLoginRequest,
  userLogoutRequest,
  userCheckCurrent,
} from './auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetchingAuth: false,
  error: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [userRegisterRequest.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = false;
      state.isLoggedIn = true;
    },
    [userLoginRequest.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = false;
      state.isLoggedIn = true;
    },
    [userLogoutRequest.fulfilled](state, _) {
      state.user = { name: null, email: null };
      state.token = null;
      state.error = false;
      state.isLoggedIn = false;
    },
    [userCheckCurrent.pending](state, _) {
      state.isFetchingAuth = true;
    },
    [userCheckCurrent.fulfilled](state, action) {
      state.user = action.payload;
      state.error = false;
      state.isLoggedIn = true;
      state.isFetchingAuth = false;
    },

    [userRegisterRequest.rejected](state, _) {
      state.error = true;
    },
    [userLoginRequest.rejected](state, _) {
      state.error = true;
    },
    [userLogoutRequest.rejected](state, _) {
      state.error = true;
    },
    [userCheckCurrent.rejected](state, _) {
      state.isFetchingAuth = false;
    },
  },
});

export default authSlice.reducer;
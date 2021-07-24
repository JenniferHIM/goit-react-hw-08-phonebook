import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  checkCurrent,
} from 'services/api-services';

export const userRegisterRequest = createAsyncThunk(
  'auth/register',
  async newUser => {
    const user = await registerRequest(newUser);
    return user;
  },
);

export const userLoginRequest = createAsyncThunk(
  'auth/login',
  async newUser => {
    const user = await loginRequest(newUser);
    return user;
  },
);

export const userLogoutRequest = createAsyncThunk(
  'auth/logout',
  async () => await logoutRequest(),
);

export const userCheckCurrent = createAsyncThunk(
  'auth/checkCurrent',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue();
    }

    const user = await checkCurrent(persistedToken);
    return user;
  },
);
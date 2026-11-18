import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { dropToken, saveToken } from '../api';
import { AuthorizationStatus } from '../const';
import type { AuthInfoResponse } from '../types/server';
import { checkAuth, login, logout } from './api-actions';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: AuthInfoResponse | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    setUser(state, action: PayloadAction<AuthInfoResponse | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.fulfilled, (state) => {
        dropToken();
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export const { setAuthorizationStatus, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;

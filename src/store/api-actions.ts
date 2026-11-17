import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';

import { dropToken, saveToken } from '../api';
import { AuthorizationStatus } from '../const';
import type { PlaceCard } from '../types/place-card';
import type { AuthInfoResponse, LoginData, OfferPreviewResponse } from '../types/server';
import { adaptOfferToClient } from '../utils/adapters';
import { setAuthorizationStatus, setUser } from './action';
import type { AppDispatch } from './index';

type ThunkConfig = {
  extra: AxiosInstance;
  rejectValue: string;
  dispatch: AppDispatch;
};

export const checkAuth = createAsyncThunk<AuthInfoResponse, undefined, ThunkConfig>(
  'user/checkAuth',
  async (_arg, { extra: api, dispatch }) => {
    const { data } = await api.get<AuthInfoResponse>('/login');
    saveToken(data.token);
    dispatch(setUser(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    return data;
  }
);

export const login = createAsyncThunk<AuthInfoResponse, LoginData, ThunkConfig>(
  'user/login',
  async (authData, { extra: api, dispatch }) => {
    const { data } = await api.post<AuthInfoResponse>('/login', authData);
    saveToken(data.token);
    dispatch(setUser(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    return data;
  }
);

export const logout = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/logout',
  async (_arg, { extra: api, dispatch }) => {
    try {
      await api.delete('/logout');
    } catch {
      // даже если сервер недоступен, локальную сессию нужно сбросить
    } finally {
      dropToken();
      dispatch(setUser(null));
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const fetchOffersAction = createAsyncThunk<PlaceCard[], undefined, ThunkConfig>(
  'data/fetchOffers',
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<OfferPreviewResponse[]>('/offers');
      return data.map(adaptOfferToClient);
    } catch {
      return rejectWithValue('Не удалось загрузить предложения. Проверьте подключение и попробуйте ещё раз.');
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';

import { AuthorizationStatus } from '../const';
import type { PlaceCard } from '../types/place-card';
import type { AuthInfoResponse, OfferPreviewResponse } from '../types/server';
import { adaptOfferToClient } from '../utils/adapters';
import { setAuthorizationStatus } from './action';
import type { AppDispatch } from './index';

type ThunkConfig = {
  extra: AxiosInstance;
  rejectValue: string;
  dispatch: AppDispatch;
};

export const login = createAsyncThunk<AuthInfoResponse, undefined, ThunkConfig>(
  'user/login',
  async (_arg, { extra: api, dispatch }) => {
    const { data } = await api.get<AuthInfoResponse>('/login');
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    return data;
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

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';

import type { PlaceCard } from '../types/place-card';
import type { OfferPreviewResponse } from '../types/server';
import { adaptOfferToClient } from '../utils/adapters';

type ThunkConfig = {
  extra: AxiosInstance;
  rejectValue: string;
};

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

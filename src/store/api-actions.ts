import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

import type { PlaceCard } from '../types/place-card';
import type { OfferDetail, Review } from '../types/offer';
import type { AuthInfoResponse, LoginData, OfferDetailResponse, OfferPreviewResponse, ReviewResponse } from '../types/server';
import { adaptOfferToClient, adaptOfferDetailToClient, adaptReviewToClient } from '../utils/adapters';

type ThunkConfig<TReject = string> = {
  extra: import('axios').AxiosInstance;
  rejectValue: TReject;
};

export type OfferDetailsPayload = {
  offer: OfferDetail;
  nearbyOffers: PlaceCard[];
};

export type OfferDetailsError = {
  status: number | null;
  message: string;
};

export type ReviewData = {
  comment: string;
  rating: number;
};

export type ReviewSubmitArg = {
  offerId: string;
  data: ReviewData;
};

export const checkAuth = createAsyncThunk<AuthInfoResponse, undefined, ThunkConfig>(
  'user/checkAuth',
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<AuthInfoResponse>('/login');
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === StatusCodes.UNAUTHORIZED) {
        return rejectWithValue('Сессия истекла');
      }
      throw error;
    }
  }
);

export const login = createAsyncThunk<AuthInfoResponse, LoginData, ThunkConfig>(
  'user/login',
  async (authData, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthInfoResponse>('/login', authData);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === StatusCodes.UNAUTHORIZED) {
        return rejectWithValue('Неверные учётные данные');
      }
      throw error;
    }
  }
);

export const logout = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/logout',
  async (_arg, { extra: api }) => {
    try {
      await api.delete('/logout');
    } catch {
      // даже если сервер недоступен, локальную сессию нужно сбросить
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

export const fetchOfferDetailsAction = createAsyncThunk<
  OfferDetailsPayload,
  string,
  ThunkConfig<OfferDetailsError>
>(
  'data/fetchOfferDetails',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const [{ data: offer }, { data: reviews }, { data: nearby }] = await Promise.all([
        api.get<OfferDetailResponse>(`/offers/${offerId}`),
        api.get<ReviewResponse[]>(`/comments/${offerId}`),
        api.get<OfferPreviewResponse[]>(`/offers/${offerId}/nearby`),
      ]);

      return {
        offer: adaptOfferDetailToClient(offer, reviews),
        nearbyOffers: nearby.slice(0, 3).map(adaptOfferToClient),
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status ?? null;

      return rejectWithValue({
        status,
        message: status === StatusCodes.NOT_FOUND
          ? 'Предложение не найдено.'
          : 'Не удалось загрузить детали предложения.',
      });
    }
  }
);

export const submitReviewAction = createAsyncThunk<Review, ReviewSubmitArg, ThunkConfig>(
  'data/submitReview',
  async ({ offerId, data: reviewData }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<ReviewResponse>(`/comments/${offerId}`, reviewData);
      return adaptReviewToClient(data);
    } catch {
      return rejectWithValue('Не удалось отправить комментарий. Попробуйте ещё раз.');
    }
  }
);

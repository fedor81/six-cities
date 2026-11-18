import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CITIES, DataLoadingStatus } from '../const';
import type { OfferDetail } from '../types/offer';
import type { City, PlaceCard } from '../types/place-card';
import { fetchOfferDetailsAction, fetchOffersAction } from './api-actions';

export type DataState = {
  city: City;
  offers: PlaceCard[];
  offersStatus: DataLoadingStatus;
  offersError: string | null;
  offerDetails: Record<string, OfferDetail>;
  offerDetailsStatus: DataLoadingStatus;
  offerDetailsError: string | null;
};

const initialState: DataState = {
  city: CITIES[0],
  offers: [],
  offersStatus: DataLoadingStatus.Idle,
  offersError: null,
  offerDetails: {},
  offerDetailsStatus: DataLoadingStatus.Idle,
  offerDetailsError: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<City>) {
      state.city = action.payload;
    },
    fillOffers(state, action: PayloadAction<PlaceCard[]>) {
      state.offers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersStatus = DataLoadingStatus.Loading;
        state.offersError = null;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersStatus = DataLoadingStatus.Success;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.offersStatus = DataLoadingStatus.Error;
        state.offersError = action.payload ?? 'Не удалось загрузить предложения.';
      })
      .addCase(fetchOfferDetailsAction.pending, (state) => {
        state.offerDetailsStatus = DataLoadingStatus.Loading;
        state.offerDetailsError = null;
      })
      .addCase(fetchOfferDetailsAction.fulfilled, (state, action) => {
        state.offerDetails[action.payload.id] = action.payload;
        state.offerDetailsStatus = DataLoadingStatus.Success;
      })
      .addCase(fetchOfferDetailsAction.rejected, (state, action) => {
        state.offerDetailsStatus = DataLoadingStatus.Error;
        state.offerDetailsError = action.payload ?? 'Не удалось загрузить детали предложения.';
      });
  },
});

export const { changeCity, fillOffers } = dataSlice.actions;

export const dataReducer = dataSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { CITIES, DataLoadingStatus } from '../const';
import type { OfferDetail } from '../types/offer';
import type { City, PlaceCard } from '../types/place-card';
import { fetchOfferDetailsAction, fetchOffersAction, submitReviewAction } from './api-actions';

export type DataState = {
  city: City;
  offers: PlaceCard[];
  offersStatus: DataLoadingStatus;
  offersError: string | null;
  offerDetails: Record<string, OfferDetail>;
  nearbyOffers: Record<string, PlaceCard[]>;
  offerDetailsNotFound: Record<string, boolean>;
  offerDetailsStatus: DataLoadingStatus;
  offerDetailsError: string | null;
  reviewSubmitStatus: DataLoadingStatus;
  reviewSubmitError: string | null;
};

const initialState: DataState = {
  city: CITIES[0],
  offers: [],
  offersStatus: DataLoadingStatus.Idle,
  offersError: null,
  offerDetails: {},
  nearbyOffers: {},
  offerDetailsNotFound: {},
  offerDetailsStatus: DataLoadingStatus.Idle,
  offerDetailsError: null,
  reviewSubmitStatus: DataLoadingStatus.Idle,
  reviewSubmitError: null,
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
        state.offerDetails[action.payload.offer.id] = action.payload.offer;
        state.nearbyOffers[action.payload.offer.id] = action.payload.nearbyOffers;
        state.offerDetailsStatus = DataLoadingStatus.Success;
      })
      .addCase(fetchOfferDetailsAction.rejected, (state, action) => {
        state.offerDetailsStatus = DataLoadingStatus.Error;
        state.offerDetailsError = action.payload?.message ?? 'Не удалось загрузить детали предложения.';

        if (action.payload?.status === StatusCodes.NOT_FOUND && action.meta.arg) {
          state.offerDetailsNotFound[action.meta.arg] = true;
        }
      })
      .addCase(submitReviewAction.pending, (state) => {
        state.reviewSubmitStatus = DataLoadingStatus.Loading;
        state.reviewSubmitError = null;
      })
      .addCase(submitReviewAction.fulfilled, (state, action) => {
        const offer = state.offerDetails[action.meta.arg.offerId];

        if (offer) {
          offer.reviews.unshift(action.payload);
        }

        state.reviewSubmitStatus = DataLoadingStatus.Success;
      })
      .addCase(submitReviewAction.rejected, (state, action) => {
        state.reviewSubmitStatus = DataLoadingStatus.Error;
        state.reviewSubmitError = action.payload ?? 'Не удалось отправить комментарий.';
      });
  },
});

export const { changeCity, fillOffers } = dataSlice.actions;

export const dataReducer = dataSlice.reducer;

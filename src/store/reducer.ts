import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, CITIES, DataLoadingStatus } from '../const';
import { City, PlaceCard } from '../types/place-card';
import type { AuthInfoResponse } from '../types/server';
import { changeCity, fillOffers, setAuthorizationStatus, setUser } from './action';
import { fetchOffersAction } from './api-actions';

export type InitialState = {
  city: City;
  offers: PlaceCard[];
  offersStatus: DataLoadingStatus;
  offersError: string | null;
  authorizationStatus: AuthorizationStatus;
  user: AuthInfoResponse | null;
};

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
  offersStatus: DataLoadingStatus.Idle,
  offersError: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
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
    });
});

export { reducer };

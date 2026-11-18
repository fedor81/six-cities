import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, CITIES, DataLoadingStatus } from '../const';
import { dropToken, saveToken } from '../api';
import { City, PlaceCard } from '../types/place-card';
import type { OfferDetail } from '../types/offer';
import type { AuthInfoResponse } from '../types/server';
import { changeCity, fillOffers, setAuthorizationStatus, setUser } from './action';
import { fetchOffersAction, fetchOfferDetailsAction, checkAuth, login, logout } from './api-actions';

export type InitialState = {
  city: City;
  offers: PlaceCard[];
  offersStatus: DataLoadingStatus;
  offersError: string | null;
  authorizationStatus: AuthorizationStatus;
  user: AuthInfoResponse | null;
  offerDetails: Record<string, OfferDetail>;
  offerDetailsStatus: DataLoadingStatus;
  offerDetailsError: string | null;
};

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
  offersStatus: DataLoadingStatus.Idle,
  offersError: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  offerDetails: {},
  offerDetailsStatus: DataLoadingStatus.Idle,
  offerDetailsError: null,
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
    })
    // Auth side effects — user и status синхронизируются автоматически
    .addCase(checkAuth.fulfilled, (state, action) => {
      saveToken(action.payload.token);
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(checkAuth.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.Unknown;
    })
    .addCase(login.fulfilled, (state, action) => {
      saveToken(action.payload.token);
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(login.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logout.fulfilled, () => {
      dropToken();
    });
});

export { reducer };

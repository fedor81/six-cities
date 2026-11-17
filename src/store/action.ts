import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { City, PlaceCard } from '../types/place-card';
import type { AuthInfoResponse } from '../types/server';

export const changeCity = createAction<City>('data/changeCity');

export const fillOffers = createAction<PlaceCard[]>('data/fillOffers');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');

export const setUser = createAction<AuthInfoResponse | null>('user/setUser');

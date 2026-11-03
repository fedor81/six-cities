import { createAction } from '@reduxjs/toolkit';
import { City, PlaceCard } from '../types/place-card';

export const changeCity = createAction<City>('data/changeCity');

export const fillOffers = createAction<PlaceCard[]>('data/fillOffers');

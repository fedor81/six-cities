import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { City, PlaceCard } from '../types/place-card';
import { changeCity, fillOffers } from './action';

export type InitialState = {
  city: City;
  offers: PlaceCard[];
};

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };

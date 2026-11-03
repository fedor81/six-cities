import { createReducer } from '@reduxjs/toolkit';
import { City, PlaceCard } from '../types/place-card';
import { changeCity, fillOffers } from './action';

export type InitialState = {
  city: City;
  offers: PlaceCard[];
};

const initialState: InitialState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 12,
    },
  },
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, PlaceCard } from '../types/place-card';

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

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<PlaceCard[]>) => {
      state.offers = action.payload;
    },
  },
});

export const { setCity, setOffers } = dataSlice.actions;

export const reducer = dataSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { createAPI } from '../api';
import { AuthorizationStatus } from '../const';
import { dataReducer } from './data-slice';
import { userReducer, setAuthorizationStatus } from './user-slice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === StatusCodes.UNAUTHORIZED) {
      store.dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }

    return Promise.reject(error);
  },
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

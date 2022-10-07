import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './features/playerSlice';
import { shazamCoreAPI } from './services/shazamCore';

export const store = configureStore( {
  reducer: {
    [shazamCoreAPI.reducerPath]: shazamCoreAPI.reducer,
    player: playerReducer,
  },
  // Add the generated API middleware to our store see https://redux-toolkit.js.org/usage/usage-guide#manual-store-setup  https://redux-toolkit.js.org/api/getDefaultMiddleware
  middleware: ( getDefaultMiddleware ) => getDefaultMiddleware().concat( shazamCoreAPI.middleware ),
} );

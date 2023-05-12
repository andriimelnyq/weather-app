import { configureStore } from '@reduxjs/toolkit';
import weathersSlice from '../features/weathers';

export const store = configureStore({
  reducer: {
    weathers: weathersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from '@reduxjs/toolkit';
import { testSlice } from './testSlice';

const store = configureStore({
  reducer: {
    test: testSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

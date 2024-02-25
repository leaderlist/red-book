import { configureStore } from '@reduxjs/toolkit';
import { testSlice } from './testSlice';
import { loginSlice } from './loginSlice';

const store = configureStore({
  reducer: {
    test: testSlice.reducer,
    login: loginSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import { testSlice } from './testSlice';
import { loginSlice } from './loginSlice';
import { userSlice } from './userSlice';

const store = configureStore({
  reducer: {
    test: testSlice.reducer,
    login: loginSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

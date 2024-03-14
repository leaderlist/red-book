import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch } from './hooks';

export const homeScreenSlice = createSlice({
  name: 'homeScreen',
  initialState: {
    activeRoute: '',
  },
  reducers: {
    changeActiveRoute: (state, action) => {
      state.activeRoute = action.payload;
    },
  },
});

export const useHomeScreenActions = () => bindActionCreators(homeScreenSlice.actions, useAppDispatch());

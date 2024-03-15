import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch } from './hooks';

export const homeScreenSlice = createSlice({
  name: 'homeScreen',
  initialState: {
    activeRoute: '',
    noteIndex: 0,
  },
  reducers: {
    changeActiveRoute: (state, action: { payload: string }) => {
      state.activeRoute = action.payload;
    },
    changeNodeIndex: (state, action: { payload: number }) => {
      state.noteIndex = action.payload;
    }
  },
});

export const useHomeScreenActions = () => bindActionCreators(homeScreenSlice.actions, useAppDispatch());

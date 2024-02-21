import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch } from './hooks';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isSelected: false,
  },
  reducers: {
    changeSelected: (state, action) => {
      state.isSelected = action.payload;
    },
  },
});

export const useLoginActions = () => bindActionCreators(loginSlice.actions, useAppDispatch());

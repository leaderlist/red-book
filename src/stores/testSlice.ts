import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from './hooks';

export const testSlice = createSlice({
  name: 'test',
  initialState: {
    value: 0,
    name: 'bbbb'
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  },
});

export const useTestActions = () => bindActionCreators(testSlice.actions, useAppDispatch());

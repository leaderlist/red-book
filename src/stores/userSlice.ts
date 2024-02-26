import { bindActionCreators, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { LoginResponse, SexyType } from 'src/types/user';
import { getStorage, setStorage } from './storage';
import { USER_INFO_STORAGE_KEY } from 'src/constants';

export enum Status {
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

const initialState: { userInfo: LoginResponse; status: Status } = {
  userInfo: {
    name: '',
    nickName: '',
    sex: SexyType.MALE,
    redBookId: 0,
    avatar: ``,
    location: '',
    desc: '',
  },
  status: Status.Loading,
};

export const checkUserInfo = createAsyncThunk('user/checkUserInfo', async () => {
  console.log(2222);
  const res = await getStorage<LoginResponse>(USER_INFO_STORAGE_KEY);
  console.log(res);
  return res;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserInfo: (state, action) => {
      state.userInfo = action.payload;
      setStorage(USER_INFO_STORAGE_KEY, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkUserInfo.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(checkUserInfo.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.userInfo = action.payload;
      })
      .addCase(checkUserInfo.rejected, (state) => {
        state.status = Status.Failed;
      });
  },
});

export const useUserInfoAction = () => bindActionCreators(userSlice.actions, useDispatch());

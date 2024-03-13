import { bindActionCreators, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { GetUserInfoResponse } from 'src/types/user';
import { getStorage, setStorage } from './storage';
import { USER_INFO_STORAGE_KEY } from 'src/constants';
import { getUserInfo } from 'src/apis/user';

export enum Status {
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

const initialState: { userInfo: GetUserInfoResponse; status: Status } = {
  userInfo: {
    user_id: '',
    nickname: '',
    guest: false,
    desc: '',
    imageb: '',
    images: ``,
  },
  status: Status.Loading,
};

export const checkUserInfo = createAsyncThunk('user/checkUserInfo', async (userInfo: Partial<GetUserInfoResponse>) => {
  const res = await getStorage<GetUserInfoResponse>(USER_INFO_STORAGE_KEY);
  console.log(res, userInfo, 'res userInfo')
  if (!res || !res.user_id || !userInfo.user_id || res.user_id !== userInfo.user_id) {
    console.log('User info changed');
    throw new Error('User info changed');
  }
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
        if (action.payload && action.payload.user_id) {
          state.status = Status.Success;
          state.userInfo = action.payload;
        } else {
          state.status = Status.Failed;
        }
      })
      .addCase(checkUserInfo.rejected, (state) => {
        state.status = Status.Failed;
      });
  },
});

export const useUserInfoAction = () => bindActionCreators(userSlice.actions, useDispatch());

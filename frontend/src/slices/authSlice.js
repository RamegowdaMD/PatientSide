import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    }
  }
});

export const { setUserInfo, clearUserInfo } = authSlice.actions;
export default authSlice.reducer;

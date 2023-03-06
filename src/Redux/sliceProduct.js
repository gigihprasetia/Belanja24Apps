import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLogin: {
    token: '',
  },
};

const Authentication = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    cekOmbak: () => {
      console.log('bisaaa');
    },
  },
});

export const {cekOmbak} = Authentication.actions;

export default Authentication.reducer;

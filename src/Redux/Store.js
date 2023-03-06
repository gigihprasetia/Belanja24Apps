import {configureStore} from '@reduxjs/toolkit';
import Authentication from './sliceProduct';
const Store = configureStore({
  reducer: {Authentication},
});

export default Store;

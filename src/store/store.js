import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import doctorsReducer from './doctorsSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer,
  },
});

export default store;

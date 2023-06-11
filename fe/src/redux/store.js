import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './reducers/RootReducer';

const store = configureStore({
    reducer: { mainReducer },
});

export default store;

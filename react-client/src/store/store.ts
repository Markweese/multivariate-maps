import { configureStore } from '@reduxjs/toolkit'
import mapboxReducer from './slices/mapSlice'
import filterReducer from './slices/filterSlice'

const store = configureStore({
  reducer: {
    mapbox: mapboxReducer,
    filter: filterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;

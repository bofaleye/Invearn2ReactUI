import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import todoSlice from './todoSlice';
import { photosApi } from "@/services/photosData";

export const store = configureStore({
  reducer: {
    // TODO: Add reducers here
    todo: todoSlice.reducer,
    [photosApi.reducerPath]: photosApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(photosApi.middleware),

})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

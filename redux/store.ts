import { configureStore } from '@reduxjs/toolkit';
import breadCrumbReducer from './slice/breadCrumbSlice';

export const store = configureStore({
    reducer: {
        breadcrumb: breadCrumbReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
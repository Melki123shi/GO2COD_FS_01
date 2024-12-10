import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import storage from 'redux-persist/lib/storage';
import {persistStore} from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import { CurrentUser } from '../services/types';

const rootReducer = combineReducers({
  user: userReducer,
})


const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware:  (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);

import { PersistPartial } from "redux-persist/es/persistReducer";

export type RootState = ReturnType<typeof store.getState> & {
  user: PersistPartial & {
    currentUser: null | CurrentUser
    signedIn: boolean;
    error: string | null;
    loading: boolean;
    token: string | null;
  };
};

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
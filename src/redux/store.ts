import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/auth.reducer';
import { favReducer } from './reducers/fav.reducer';

// Create your reducer function(s) here

const reducers = combineReducers({
  auth: authReducer,
  fav: favReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'fav'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

let persistor = persistStore(store);
export { store, persistor };

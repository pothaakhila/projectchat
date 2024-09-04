/*import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './rootReducer';
import userReducer from './slices/user';

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  user: userReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
   
});

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
*/   



// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './rootReducer';

// Create a persisted reducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,  // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Disable serializableCheck if using non-serializable values
      immutableCheck: false,    // Disable immutableCheck if needed
    }),
});

// Create a persistor
const persistor = persistStore(store);

// Define custom hooks
const useSelector = useAppSelector;
const useDispatch = () => useAppDispatch();

export { store, persistor, useSelector, useDispatch };

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { authSlice } from './state/index.js'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authSlice)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE]
      }
    })
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)

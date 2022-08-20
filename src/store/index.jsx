import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import app from './storeList/app'

const persistConfig = {
    key: 'redux',
    storage,
    whitelist: ['app']
}

const reducer = combineReducers({
    app
})

const persistedReducer = persistReducer(persistConfig, reducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(logger)))
let persistor = persistStore(store)
export {
    store,
    persistor
}
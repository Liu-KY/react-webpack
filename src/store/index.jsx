import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import app from './storeList/app'
import user from './storeList/user'
import good from './storeList/good'

const persistConfig = {
    key: 'app',
    storage,
    // whitelist: ['app']
}

const authPersistConfig = {
    key: 'user',
    storage: storage,
    whitelist: ['token']
}


const reducer = combineReducers({
    app:persistReducer(persistConfig, app), 
    user: persistReducer(authPersistConfig, user),
    good
})

// const persistedReducer = persistReducer(persistConfig, reducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(reducer, composeEnhancers(
    applyMiddleware(reduxThunk, reduxPromise),
    // applyMiddleware(logger),

))
let persistor = persistStore(store)
export {
    store,
    persistor
}
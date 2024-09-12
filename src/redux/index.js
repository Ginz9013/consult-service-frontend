import localstorage from 'redux-persist/lib/storage';
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import AuthReducer from "./reducers/authReducer";
import UserReducer from "./reducers/userReducer";

// 把所有 reducer 合併
const rootReducer = combineReducers({
    authentication: AuthReducer,
    user: UserReducer,
});

// 持久化設定
const persistConfig = {
    key: "client",
    version: 1,
    storage: localstorage
};

// 打包成持久化 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 初始化 store
const initialStore=() =>{
    // configureStore - redux-toolkit 的方法，創造 store 用的
    return configureStore({
        reducer: persistedReducer,
        // 設定中介層方法
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
              serializableCheck: {
                  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
              },
          }),
    })
};

export const store = initialStore();

export const persistor=persistStore(store);


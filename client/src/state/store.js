import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { userApi } from "./api";
import authReducer from "./authSlice.js"
import productReducer from "./productSlice.js"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import utilReducer from "./utilSlice.js"
import persistStore from "redux-persist/es/persistStore";



const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    authReducer,
    productReducer,
    utilReducer,
})

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth','product', 'util'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    // middleware: (getDefaultMiddleware) => {
    //     getDefaultMiddleware().concat(userApi.middleware)
    // }
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(
            {
                immutableCheck: false,
                serializableCheck: false
            }),
        userApi.middleware
    ],
});

export const persistor = persistStore(store);
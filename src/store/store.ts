import {combineReducers, configureStore} from "@reduxjs/toolkit";
import tokenReducer from './reducers/TokenSlice';
import cartReducer from './reducers/CartSlice';
import {userAPI} from "../services/UserService";
import {typesAPI} from "../services/TypesService";
import {brandAPI} from "../services/BrandService";
import {hardwareAPI} from "../services/HardwareService";
import {laptopAPI} from "../services/LaptopService";
import {imageAPI} from "../services/ImageService";
import {favoriteAPI} from "../services/FavoriteService";
import {reviewAPI} from "../services/ReviewService";
import {FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {orderAPI} from "../services/OrderService";
import {notificationAPI} from "../services/NotificationService";
import {passwordAPI} from "../services/PasswordService";
import {baseAPI} from "../services/BaseAPI"; // defaults to localStorage for web


const rootReducer = combineReducers({
    tokenReducer,
    cartReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [typesAPI.reducerPath]: typesAPI.reducer,
    [brandAPI.reducerPath]: brandAPI.reducer,
    [hardwareAPI.reducerPath]: hardwareAPI.reducer,
    [laptopAPI.reducerPath]: laptopAPI.reducer,
    [imageAPI.reducerPath]: imageAPI.reducer,
    [favoriteAPI.reducerPath]: favoriteAPI.reducer,
    [reviewAPI.reducerPath]: reviewAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [notificationAPI.reducerPath]: notificationAPI.reducer,
    [passwordAPI.reducerPath]: passwordAPI.reducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['tokenReducer', 'cartReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(baseAPI.middleware)

    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

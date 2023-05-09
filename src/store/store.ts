import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice';
import tokenReducer from './reducers/TokenSlice';
import cartReducer from './reducers/CartSlice';
import {postAPI} from "../services/PostService";
import {userAPI} from "../services/UserService";
import {typesAPI} from "../services/TypesService";
import {brandAPI} from "../services/BrandService";
import {hardwareAPI} from "../services/HardwareService";
import {laptopAPI} from "../services/LaptopService";
import {imageAPI} from "../services/ImageService";
import {favoriteAPI} from "../services/FavoriteService";
import {reviewAPI} from "../services/ReviewService";
import {persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const rootReducer = combineReducers({
    userReducer,
    tokenReducer,
    cartReducer,
    [postAPI.reducerPath]: postAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [typesAPI.reducerPath]: typesAPI.reducer,
    [brandAPI.reducerPath]: brandAPI.reducer,
    [hardwareAPI.reducerPath]: hardwareAPI.reducer,
    [laptopAPI.reducerPath]: laptopAPI.reducer,
    [imageAPI.reducerPath]: imageAPI.reducer,
    [favoriteAPI.reducerPath]: favoriteAPI.reducer,
    [reviewAPI.reducerPath]: reviewAPI.reducer,
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
            .concat(postAPI.middleware)
            .concat(userAPI.middleware)
            .concat(brandAPI.middleware)
            .concat(hardwareAPI.middleware)
            .concat(laptopAPI.middleware)
            .concat(imageAPI.middleware)
            .concat(favoriteAPI.middleware)
            .concat(reviewAPI.middleware)
            .concat(typesAPI.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

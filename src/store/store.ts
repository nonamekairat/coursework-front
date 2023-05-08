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

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
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

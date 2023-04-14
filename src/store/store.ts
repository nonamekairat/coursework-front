import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import tokenReducer from './reducers/TokenSlice'
import {postAPI} from "../services/PostService";
import {userAPI} from "../services/UserService";

const rootReducer = combineReducers({
    userReducer,
    tokenReducer,
    [postAPI.reducerPath]: postAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            .concat(postAPI.middleware)
            .concat(userAPI.middleware),
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../util/Constants";
import {IToken} from "../models/IToken";
import {IRegister} from "../models/user/IRegister";
import {IAuthenticate} from "../models/user/IAuthenticate";
import {IUser} from "../models/user/IUser";
import {RootState} from "../store/store";


export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery(
        {
            baseUrl: API_URL + "/api",
            prepareHeaders: (headers, {getState}) => {
                const token = (getState() as RootState).tokenReducer.accessToken;
                // console.log(token);
                // const {token} = useAppSelector(state => state.tokenReducer)
                // If we have a token set in state, let's assume that we should be passing it.
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`)
                }
                // console.log(headers);
                return headers
            },
        }),
    tagTypes: ['User'],

    endpoints: (build) => ({

        registerUser: build.mutation<IToken, IRegister>({
            query: (user) => ({
                url: `/auth/register`,
                method: 'POST',

                body: user
            }),
        }),
        authenticateUser: build.mutation<IToken, IAuthenticate>({
            query: (user) => ({
                url: `/auth/login`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),

        fetchUser: build.query<IUser, null>({
            query: () => ({
                url: `/users/myInfo`,
                method: 'GET'
            }),
            providesTags: result => ['User']
        }),
    })
})
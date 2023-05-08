import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../util/Constants";
import {RootState} from "../store/store";


export const typesAPI = createApi({
    reducerPath: "typesAPI",
    baseQuery: fetchBaseQuery(
        {
            baseUrl: API_URL + "/api",
            prepareHeaders: (headers, {getState}) => {
                const token = (getState() as RootState).tokenReducer.accessToken;
                console.log(token);
                // const {token} = useAppSelector(state => state.tokenReducer)
                // If we have a token set in state, let's assume that we should be passing it.
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`)
                }
                console.log(headers);
                return headers
            },
        }),

    endpoints: (build) => ({

        fetchTypes: build.query<string[], string>({
            query: (type) => ({
                url: `/types/${type}`,
                method: 'GET'
            }),
        }),
    })
})
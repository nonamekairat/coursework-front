import {baseAPI} from "./BaseAPI";


export const typesAPI = baseAPI.injectEndpoints({

    endpoints: (build) => ({

        fetchTypes: build.query<string[], string>({
            query: (type) => ({
                url: `/types/${type}`,
                method: 'GET'
            }),
        }),
    })
})
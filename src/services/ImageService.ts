import {baseAPI} from "./BaseAPI";


export const imageAPI = baseAPI.injectEndpoints({

    endpoints: (build) => ({

        saveLaptopImage: build.mutation<string, any>({
            query: (laptopImage: any) => ({
                url: `/image/upload/laptop/${laptopImage.id}`,
                method: 'POST',
                body: laptopImage.data,
            }),
        }),
        saveMyAvatar: build.mutation<string, any>({
            query: (laptopImage: any) => ({
                url: `/image/upload/myAvatar`,
                method: 'POST',
                body: laptopImage.data,
            }),
        }),
    })
})
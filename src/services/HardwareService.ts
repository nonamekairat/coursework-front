import {IHardware, IHardwareRequest} from "../models/ILaptop";
import {baseAPI} from "./BaseAPI";


export const hardwareAPI = baseAPI.injectEndpoints({

    endpoints: (build) => ({

        fetchAllHardware: build.query<IHardware[], null>({
            query: () => ({
                url: `/hardware`,
                method: 'GET'
            }),
            providesTags: result => ['Hardware']
        }),
        addHardware: build.mutation<IHardware, IHardwareRequest>({
            query: (hardware) => ({
                url: `/hardware`,
                method: 'POST',
                body: hardware
            }),
            invalidatesTags: ['Hardware', 'Notification']
        }),
    })
})
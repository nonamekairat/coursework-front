import {useEffect} from "react";


export const useUserLoad = (trigger: (e: null) => void, accessToken: string | null) => {

    useEffect(() => {
        if(accessToken) trigger(null)
    }, [accessToken])

}
import React, {FC} from 'react';
import {userAPI} from "../services/UserService";
import {Role} from "../models/user/IUser";
import {useAppSelector} from "../hooks/redux";

interface props {
    children: React.ReactNode
}

const AdminRoute:FC<props> = ({children}) => {

    const {accessToken} = useAppSelector(state => state.tokenReducer);

    const {data: myInfo} = userAPI.useFetchUserQuery(null);
    console.log(myInfo);

    if(myInfo && myInfo.role === Role.ROLE_ADMIN){
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
    }


    return (
        <React.Fragment>
        </React.Fragment>
    );
};

export default AdminRoute;
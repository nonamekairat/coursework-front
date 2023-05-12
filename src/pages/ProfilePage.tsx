import React from 'react';
import {userAPI} from "../services/UserService";
import UserInformation from "../components/UI/profile/UserInformation";
import ProfileMenu from "../components/UI/profile/ProfileMenu";
import {useLocation} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";
import {useUserLoad} from "../hooks/useUserLoad";


const ProfilePage = () => {

    const {accessToken: accessToken} = useAppSelector(state => state.tokenReducer)
    const [trigger, {data: user, error, isLoading}] = userAPI.useLazyFetchUserQuery();

    useUserLoad(trigger, accessToken);

    const location = useLocation();
    let item = location.state.item;

    return (
        <div className="container mx-auto mt-20 flex">
            <div className="w-full">
                {/*todo: notifications - orders - favorite_laptops*/}
                {item ? <ProfileMenu item={parseInt(item)} /> : <ProfileMenu item={0} />

                }


            </div>
            <div className="w-4/12">
                <UserInformation user={user} />
            </div>



        </div>
    );
};




export default ProfilePage;
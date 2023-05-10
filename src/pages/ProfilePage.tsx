import React from 'react';
import {userAPI} from "../services/UserService";
import UserInformation from "../components/UI/profile/UserInformation";
import ProfileMenu from "../components/UI/profile/ProfileMenu";


const ProfilePage = () => {

    const {data: user, error, isLoading, refetch} = userAPI.useFetchUserQuery(null);

    return (
        <div className="container mx-auto mt-20 flex">
            <div className="w-full">
                {/*todo: notifications - orders - favorite_laptops*/}
                <ProfileMenu />

            </div>
            <div className="w-4/12">
                <UserInformation user={user} />
            </div>



        </div>
    );
};




export default ProfilePage;
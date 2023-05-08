import React from 'react';
import {postAPI} from "../services/PostService";
import {userAPI} from "../services/UserService";
import UserInformation from "../components/UI/profile/UserInformation";


const ProfilePage = () => {

    const {data: user, error, isLoading, refetch} = userAPI.useFetchUserQuery(null);

    return (
        <div className="container mx-auto mt-20 flex">
            <div className="w-full bg-amber-500">
                todo: notifications - orders - favorite_laptops
            </div>
            <div className="w-4/12 bg-amber-200">

                <UserInformation user={user} />

            </div>



        </div>
    );
};

export default ProfilePage;
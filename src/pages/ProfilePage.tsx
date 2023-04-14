import React from 'react';
import {postAPI} from "../services/PostService";
import {userAPI} from "../services/UserService";


const ProfilePage = () => {

    const {data: user, error, isLoading, refetch} = userAPI.useFetchUserQuery(null);



    return (
        <div className="container mx-auto mt-20">
            <p>{user?.address}</p>
            <p>{user?.email}</p>
            <p>{user?.firstName}</p>
            <p>{user?.lastName}</p>
            <p>{user?.phoneNumber}</p>
            <p>{user?.username}</p>
        </div>
    );
};

export default ProfilePage;
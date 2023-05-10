import React from 'react';
import {userAPI} from "../services/UserService";
import UserInformation from "../components/UI/profile/UserInformation";
import ProfileMenu from "../components/UI/profile/ProfileMenu";
import {useLocation} from "react-router-dom";


const ProfilePage = () => {

    const {data: user, error, isLoading, refetch} = userAPI.useFetchUserQuery(null);
    // const {item} = useParams();
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
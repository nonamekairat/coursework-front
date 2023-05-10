import React, {FC} from 'react';
import {IUser} from "../../../models/user/IUser";
import avatar from "../../../assets/avatar.png";
import {Typography} from "@material-tailwind/react";

interface UserInformationProps {
    user: IUser | undefined;
}

const UserInformation:FC<UserInformationProps> = ({user}) => {

    return (
        <div className="">
            <img src={user?.imageUrl ? user?.imageUrl : avatar}
                 alt="not found"
                 className="
                 mx-auto w-6/12 my-3
                 shadow rounded-full max-w-full h-auto align-middle border-none"/>
            <div className="text-center font-semibold">
                <Typography variant="lead">
                    {user ? user.email : "адресс электронной почты"}
                </Typography>
            </div>
        </div>

    );
};

export default UserInformation;
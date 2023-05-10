import React, {FC} from 'react';
import {IUser} from "../../../models/user/IUser";
import {useNavigate} from "react-router-dom";
import StandartButton from "../button/StandartButton";
import avatar from "../../../assets/avatar.png";
import {Typography} from "@material-tailwind/react";

interface UserInformationProps {
    user: IUser | undefined;
}

const UserInformation:FC<UserInformationProps> = ({user}) => {

    const navigate = useNavigate();

    const changeLink = () => {
        navigate("change")
    }


    return (
        <div className="">
            <img src={user?.imageUrl ? user?.imageUrl : avatar}
                 alt="not found"
                 className="
                 mx-auto w-6/12 my-3
                 shadow rounded-full max-w-full h-auto align-middle border-none"/>
            <div className="text-center font-semibold">
                <Typography variant="lead">
                    {user?.email}
                </Typography>
            </div>
            <div className="mx-auto flex flex-col items-center my-3">

            </div>


        </div>

    );
};

export default UserInformation;
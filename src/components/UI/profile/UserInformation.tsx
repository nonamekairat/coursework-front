import React, {FC} from 'react';
import {IUser} from "../../../models/user/IUser";
import {useNavigate} from "react-router-dom";
import StandartButton from "../button/StandartButton";
import avatar from "../../../assets/avatar.png";

interface UserInformationProps {
    user: IUser | undefined;
}

const UserInformation:FC<UserInformationProps> = ({user}) => {

    const navigate = useNavigate();

    const changeLink = () => {
        navigate("change")
    }


    return (
        <div>
            <img src={user?.imageUrl ? user?.imageUrl : avatar}
                 alt="not found"
                 className="
                 mx-auto w-6/12 my-3
                 shadow rounded-full max-w-full h-auto align-middle border-none"/>
            <div className="text-center font-semibold">
                <div>address {user?.address}</div>
                <div>email {user?.email}</div>
                <div>first name {user?.firstName}</div>
                <div>last name {user?.lastName}</div>
                <div>phone number {user?.phoneNumber}</div>
                <div>username {user?.username}</div>
            </div>
            <div className="mx-auto flex flex-col items-center my-3">
                <StandartButton onClick={changeLink}>
                    change
                </StandartButton>
            </div>


        </div>

    );
};

export default UserInformation;
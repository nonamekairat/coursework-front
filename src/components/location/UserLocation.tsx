import React, {FC} from 'react';
import address from "../../assets/address-1.png";

interface UserLocationProps {
    address?: string;
}

const UserLocation:FC<UserLocationProps> = ({address}) => {

    if(address === "" || address === null){
        return (
            <div></div>
        )
    }

    return (
        <div className="p-5">
            <div className="pb-3">
                <div>
                    Адресс для доставки:
                </div>

                <div className="underline">
                    {address}
                </div>
            </div>
        </div>
    );
};

export default UserLocation;
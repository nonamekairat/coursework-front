import React, {FC, useEffect, useState} from "react";
import {MenuItem} from "@material-tailwind/react";
import OrderTable from "../order/OrderTable";
import FavoriteLaptopsContainer from "../laptop/FavoriteLaptopsContainer";
import UserAbout from "./UserAbout";
import NotificationContainer from "../notification/NotificationContainer";


const menu = [
    {
        children: <OrderTable />,
        label: "Ваши заказы",
    },
    {
        children: <FavoriteLaptopsContainer/>,
        label: "Ваши любимые товары",
    },
    {
        children: <NotificationContainer />,
        label: "Уведомления",
    },
    {
        children: <UserAbout />,
        label: "Ваша информация",
    },
]


interface ProfileMenuProps {
    item: number;
}

const ProfileMenu:FC<ProfileMenuProps> = ({item}) => {

    const [active, setActive] = useState(item);
    useEffect(() => {

    }, [active])
    const activeClass = "border-blue-400"

    return (
        <div>
            <div className="flex">
                {menu.map((value, index) =>
                    <MenuItem>
                        <div className={  index === active ?
                            "text-lg px-3 py-2 border-b-2 " + activeClass : "text-lg py-2 px-3 border-b-2"}
                             onClick={() => setActive(index)}
                        >
                            {value.label}
                        </div>
                    </MenuItem>

                )}
            </div>
            <div className="mt-5">
                {menu[active].children}
            </div>
        </div>


    )
}
export default ProfileMenu
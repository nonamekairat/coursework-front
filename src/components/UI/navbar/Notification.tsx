import React, {FC, useState} from 'react';
import {notificationAPI} from "../../../services/NotificationService";
import NotificationItem from "../notification/NotificationItem";
import {Menu, MenuHandler, MenuItem, MenuList} from "@material-tailwind/react";
import MyBadge from "./MyBadge";


const notificationIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-blue-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
</svg>;

interface NotificationProps {
    className?: string;
}

const Notification:FC<NotificationProps> = ({className}) => {

    const {data: notifications} = notificationAPI.useFetchAllNotificationsQuery(null);
    const [isMenuOpen, setIsMenuOpen] = useState();
    const [deleteAll, {}] = notificationAPI.useDeleteNotificationsMutation();


    const deleteAllHandle = () => {
        deleteAll(null);
    }

    return (

        <Menu dismiss={{
            itemPress:false
        }} open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler >
                {/*{notifications ?*/}
                {/*    <MyBadge length={notifications.length}>{notificationIcon}</MyBadge>*/}
                {/*    :*/}
                {/*    <div>*/}
                {/*        {notificationIcon}*/}
                {/*    </div>*/}
                {notificationIcon}

            </MenuHandler>
            <MenuList className="p-1 max-h-96 text-black">
                <MenuItem className="">
                    <div className="flex text-xl justify-between text-center font-semibold flex p-2 border-b-2">
                        <div>
                            Уведомления
                        </div>
                        <div className="flex space-x-1">
                            <div className="">
                                {notifications && notifications.length}
                            </div>
                            <div className="hover:bg-white" onClick={deleteAllHandle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>

                        </div>
                    </div>
                </MenuItem>
                {notifications && notifications.length !== 0 ?
                    notifications.map(notification =>
                        <MenuItem>
                            <NotificationItem
                                className="w-full"
                                key={notification.id}
                                notification={notification}
                            />
                        </MenuItem>

                    )
                    :
                    <MenuItem>
                        <div className="p-2 bg-white w-96">У вас пока нету уведомлений</div>
                    </MenuItem>

                }
            </MenuList>
        </Menu>

    );
};

export default Notification;
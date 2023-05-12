import React, {FC} from 'react';
import NotificationItem from "./NotificationItem";
import {notificationAPI} from "../../../services/NotificationService";
import {MenuItem} from "@material-tailwind/react";
import MessagePage from "../../../pages/MessagePage";

interface NotificationContainerProps {
}

const NotificationContainer:FC<NotificationContainerProps> = ({}) => {

    const {data: notifications} = notificationAPI.useFetchAllNotificationsQuery(null);
    // const notifications: INotification[] = [
    //     {
    //         id: 1,
    //         message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat efficitur aliquet. Quisque sed elit justo. Ut eget interdum lorem. Cras eget varius diam. Maecenas.",
    //         header: "Lorem ipsum",
    //         read: false
    //     },
    //     {
    //         id: 2,
    //         message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat efficitur aliquet. Quisque sed elit justo. Ut eget interdum lorem. Cras eget varius diam. Maecenas.",
    //         header: "Lorem ipsum",
    //         read: false
    //     },
    //     {
    //         id: 3,
    //         message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat efficitur aliquet. Quisque sed elit justo. Ut eget interdum lorem. Cras eget varius diam. Maecenas.",
    //         header: "Lorem ipsum",
    //         read: false
    //     },
    //     {
    //         id: 4,
    //         message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat efficitur aliquet. Quisque sed elit justo. Ut eget interdum lorem. Cras eget varius diam. Maecenas.",
    //         header: "Lorem ipsum",
    //         read: false
    //     }
    // ]

    const [deleteAll, {}] = notificationAPI.useDeleteNotificationsMutation();


    const deleteAllHandle = () => {
        deleteAll(null);
    }

    if(notifications && notifications.length === 0){
        return (<MessagePage message="У вас пока нету Уведомлений" />)
    }



    return (
        <div>
            <MenuItem>
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

            <div className="flex flex-col space-y-2">

                {notifications && notifications.map(notification =>
                    <MenuItem key={notification.id}>
                        <NotificationItem notification={notification}/>
                    </MenuItem>

                )}
            </div>
        </div>
    );
};

export default NotificationContainer;
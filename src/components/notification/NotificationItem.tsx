import React, {FC} from 'react';
import {INotification} from "../../models/INotification";
import {xMark} from "../laptop/LaptopInCart";
import {notificationAPI} from "../../services/NotificationService";

interface NotificationItemProps {
    notification: INotification;
    className?: string
}

const NotificationItem:FC<NotificationItemProps> = ({notification, className}) => {

    const [deleteById, {}] = notificationAPI.useDeleteNotificationByIdMutation();

    const removeNotification = () => {
        deleteById(notification.id);
    }

    return (
        <div className={"p-2 " + className}>
            <div className="flex justify-between">
                <div className="text-xl font-semibold">
                    {notification.header}
                </div>
                <div>
                    <div onClick={removeNotification} className="hover:bg-white hover:drop-shadow-md" color="white">{xMark}</div>
                </div>
            </div>

            <div className="text-sm">
                {notification.message}
            </div>
        </div>
    );
};

export default NotificationItem;
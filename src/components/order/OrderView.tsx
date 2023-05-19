import React, {FC, useState} from 'react';
import {IOrder} from "../../models/IOrder";
import {convertDate} from "../../util/Functions";
import {IconButton, Tooltip, Typography} from "@material-tailwind/react";
import {BookmarkSlashIcon, MinusIcon, PencilIcon, TrashIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {orderAPI} from "../../services/OrderService";


interface OrderViewProps {
    order: IOrder;
    isLast: boolean
}

const OrderView:FC<OrderViewProps> = ({isLast, order:{id, laptops, deliveryType, paymentType, orderStatus, createdAt, updatedAt}}) => {
    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    let sum = 0;

    for (let i = 0; i < laptops.length; i++) {
        sum += laptops[i].price;
    }

    const [isChanging, setIsChanging] = useState(false);
    const [cancelOrder, {}] = orderAPI.useCancelOrderMutation();
    const [deleteOrder, {}] = orderAPI.useDeleteOrderMutation();

    const changeButton = () => {
        setIsChanging(!isChanging);
    }

    const cancelOrderHandle = () => {
        cancelOrder(id);
    }
    const deleteOrderHandle = () => {
        deleteOrder(id);
    }

    return (
        <tr key={id}>
            <td className={classes}>
                <div className="flex items-center gap-3">
                    <Typography variant="small" color="blue-gray" className="font-bold">
                        {orderStatus}
                    </Typography>
                </div>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {sum} сом
                </Typography>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {convertDate(createdAt)}
                </Typography>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {convertDate(updatedAt)}
                </Typography>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {deliveryType}
                </Typography>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {paymentType}
                </Typography>
            </td>
            <td className={classes}>
                {isChanging ?
                    <div className="flex space-x-2">

                        <Tooltip content="Отменить заказ">
                            <IconButton onClick={cancelOrderHandle} variant="text" color="blue-gray">
                                <BookmarkSlashIcon className="h-4 w-4" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip content="Удалить заказ">
                            <IconButton onClick={deleteOrderHandle} variant="text" color="blue-gray">
                                <TrashIcon className="h-4 w-4" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip content="отменить действие">
                            <IconButton onClick={changeButton} variant="text" color="blue-gray">
                                <XMarkIcon className="h-4 w-4" />
                            </IconButton>
                        </Tooltip>
                    </div> :
                    <Tooltip content="Редактировать">
                        <IconButton onClick={changeButton} variant="text" color="blue-gray">
                            <PencilIcon className="h-4 w-4" />
                        </IconButton>
                    </Tooltip>
                }

            </td>
        </tr>
    );
}

export default OrderView;
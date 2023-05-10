import React, {FC, useState} from 'react';
import {orderAPI} from "../../../services/OrderService";
import {Checkbox, IconButton, Tooltip, Typography} from "@material-tailwind/react";
import {convertDate} from "../../../util/Functions";
import {BookmarkSlashIcon, CheckIcon, PencilIcon, TrashIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {IOrder} from "../../../models/IOrder";
import OrderStatus from "./OrderStatus";
import {Check} from "heroicons-react";
import {typesAPI} from "../../../services/TypesService";
import {types} from "../../../util/Constants";

interface OrderViewAdminProps {
    order: IOrder;
    isLast: boolean
}


const OrderAdminView:FC<OrderViewAdminProps> = ({isLast, order
}) => {
    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    let sum = 0;

    for (let i = 0; i < order.laptops.length; i++) {
        sum += order.laptops[i].price;
    }

    const [isChanging, setIsChanging] = useState(false);
    const [changeStatus, {}] = orderAPI.useChangeStatusMutation();
    const {data: orderStatuses} = typesAPI.useFetchTypesQuery(types.orderStatus);
    const [orderStatus, setOrderStatus] = useState<string>(order.orderStatus);
    const [orderMessage, setOrderMessage] = useState("");

    const changeButton = () => {
        setIsChanging(!isChanging);
    }
    const changeOrderHandle = () => {
        const orderMessage = "статус одного из ваших заказов был обновлён"
        const request = {params: {orderStatus: orderStatus, message: orderMessage}, id: order.id};
        console.log(request);
        changeStatus(request)
        setIsChanging(false);
    }

    return (
        <tr key={order.id}>
            <td className={classes}>
                <div className="inline-block align-middle">
                        <OrderStatus
                            orderStatuses={orderStatuses ? orderStatuses: []}
                            isChanging={isChanging}
                            value={orderStatus}
                            setStatus={setOrderStatus} />
                </div>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" as={"span"} className="font-normal">
                    {sum} сом
                </Typography>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {convertDate(order.createdAt)}
                </Typography>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {convertDate(order.updatedAt)}
                </Typography>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {order.deliveryType}
                </Typography>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {order.paymentType}
                </Typography>
            </td>
            <td className={classes}>
                {isChanging ?
                    <div className="flex space-x-2 justify-end">

                        <Tooltip content="подтвердить действие">
                            <IconButton onClick={changeOrderHandle} variant="text" color="blue-gray">
                                <CheckIcon className="h-4 w-4" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip content="отменить действие">
                            <IconButton onClick={changeButton} variant="text" color="blue-gray">
                                <XMarkIcon className="h-4 w-4" />
                            </IconButton>
                        </Tooltip>
                    </div> :
                    <div className="flex justify-end">
                        <Tooltip content="Редактировать">
                            <IconButton onClick={changeButton} variant="text" color="blue-gray">
                                <PencilIcon className="h-4 w-4" />
                            </IconButton>
                        </Tooltip>
                    </div>

                }

            </td>
        </tr>
    );
}

export default OrderAdminView;
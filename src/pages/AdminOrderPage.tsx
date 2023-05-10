import React from 'react';
import {orderAPI} from "../services/OrderService";
import MessagePage from "./MessagePage";
import {Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import OrderView from "../components/UI/order/OrderView";
import OrderAdminView from "../components/UI/order/OrderAdminView";

const TABLE_HEAD = ["Статус", "Общая сумма", "Дата заказа", "Дата обновления", "Тип доставки", "Тип оплаты", ""];

const AdminOrderPage = () => {

    const {data: orders, } = orderAPI.useFetchAllOrdersQuery(null);


    if(orders && orders.length === 0)
        return (<MessagePage message="У вас пока нету заказов" />)

    return (
        <div className="px-3 mx-auto">
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Последние заказы
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Это подробная информация о последних заказах
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-0">
                    <table className="w-full min-w-max table-fixed text-left">
                        <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {orders && orders.map(
                            (order, index) => {
                                const isLast = index === orders.length - 1;
                                return <OrderAdminView isLast={isLast} order={order} key={order.id} />
                            },
                        )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
};

export default AdminOrderPage;
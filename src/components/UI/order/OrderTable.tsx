import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {Card, CardBody, CardHeader, Input, Typography,} from "@material-tailwind/react";
import {orderAPI} from "../../../services/OrderService";
import React from "react";
import OrderView from "./OrderView";
import MessagePage from "../../../pages/MessagePage";

const TABLE_HEAD = ["Статус", "Общая сумма", "Дата заказа", "Дата обновления", "Тип доставки", "Тип оплаты", ""];


export default function OrderTable() {

    const {data: TABLE_ROWS, } = orderAPI.useFetchAllOrdersQuery(null);


    if(TABLE_ROWS && TABLE_ROWS.length === 0)
        return (<MessagePage message="У вас пока нету заказов" />)

    return (
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
                <table className="w-full min-w-max table-auto text-left">
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
                    {TABLE_ROWS && TABLE_ROWS.map(
                        (order, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            return <OrderView isLast={isLast} order={order} key={order.id} />

                        },
                    )}
                    </tbody>
                </table>
            </CardBody>

        </Card>

    );
}
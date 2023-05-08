import React, {FC} from 'react';
import {ILaptop} from "../../../models/ILaptop";
import {Button} from "@material-tailwind/react";
import {useAppDispatch} from "../../../hooks/redux";
import {cartSlice} from "../../../store/reducers/CartSlice";

interface OrderComponentProps {
    laptop: ILaptop;
}


const OrderComponent:FC<OrderComponentProps> = ({laptop}) => {

    const dispatch = useAppDispatch();

    const toCartHandle = (e: any) => {
        dispatch(cartSlice.actions.addToCart(laptop));
    }
    const buyNowHandle = (e: any) => {
        //todo later
    }

    return (
        <div className="border-2 rounded-3xl h-96">
            <div className="p-4">
                <div className="text-3xl mb-8">
                    {laptop.price} сом
                </div>
                {laptop.amount === 1 ?
                    <div className="text-red-700">*на складе осталось только 1 ноутбук этой модели</div>
                    :
                    laptop.amount === 0 ?
                        <div className="text-red-700">*на складе не осталось ноутбуков этой модели</div>
                        :
                        <div></div>
                }
                <div className="flex flex-col space-y-2">
                <Button color="yellow" className="rounded-3xl" onClick={toCartHandle}>добавить в корзину</Button>
                <Button color="amber" className="rounded-3xl" onClick={buyNowHandle}>купить сейчас</Button>
                </div>
            </div>
        </div>
    );
};

export default OrderComponent;
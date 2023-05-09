import React, {FC, useState} from 'react';
import {ILaptop} from "../../../models/ILaptop";
import {Button} from "@material-tailwind/react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {cartSlice} from "../../../store/reducers/CartSlice";
import Counter from "../counter/Counter";

interface OrderComponentProps {
    laptop: ILaptop;
}


const OrderComponent:FC<OrderComponentProps> = ({laptop}) => {

    const dispatch = useAppDispatch();
    const {laptops} = useAppSelector(state => state.cartReducer);
    const [count, setCount] = useState(1);


    const toCartHandle = (e: any) => {
        for (let i = 0; i < count; i++) {
            dispatch(cartSlice.actions.addToCart(laptop));
        }

    }
    const buyNowHandle = (e: any) => {
        //todo later
    }

    return (
        <div className="border-4 rounded-3xl h-96">
            <div className="p-6">
                <div className="text-3xl mb-8">
                    {laptop.price} сом
                </div>
                {laptop.amount === 1 ?
                    <div className="text-red-700 mb-3">*на складе остался только 1 ноутбук этой модели</div>
                    :
                    laptop.amount === 0 ?
                        <div className="text-red-700 mb-3">*на складе не осталось ноутбуков этой модели</div>
                        :
                        <div></div>
                }

                <div className="flex flex-col space-y-2">
                    <div className="w-4/12">
                        <Counter maxValue={laptop.amount} value={count} setValue={setCount}/>
                    </div>
                    <Button color="yellow" className="rounded-3xl" onClick={toCartHandle}>добавить в корзину</Button>
                    <Button color="amber" className="rounded-3xl" onClick={buyNowHandle}>купить сейчас</Button>
                </div>
            </div>
        </div>
    );
};

export default OrderComponent;
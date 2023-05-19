import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../hooks/redux";
import LaptopInCart from "../components/laptop/LaptopInCart";
import {ICartLaptop, ILaptop} from "../models/ILaptop";
import MessagePage from "./MessagePage";
import CartOrder from "../components/order/CartOrder";


const CartPage = () => {

    const {laptops} = useAppSelector(state => state.cartReducer);
    const [laptopCounts, setLaptopCounts] = useState<ICartLaptop[]>([]);

    useEffect(() => {
        const cartLaptops = [] as ICartLaptop[];
        for (let i = 0; i < laptops.length; i++) {
            setLaptops(laptops[i], cartLaptops);
        }
        setLaptopCounts(cartLaptops)

    }, [])

    const setLaptops = (laptop: ILaptop, cartLaptops: ICartLaptop[]) => {
        for (let i = 0; i < cartLaptops.length; i++) {
            if(cartLaptops[i].laptop.id === laptop.id){
                cartLaptops[i].count += 1;
                return;
            }
        }
        cartLaptops.push({laptop: laptop, count: 1});
    }

    if(laptops.length === 0){
        return (<MessagePage message="У вас пока нету ноутбуков в корзине" />)
    }

    return (
        <div className="px-3 mx-auto mt-20">

            <div className="flex justify-between">
                <div className="w-5/12">
                    <div className="text-3xl mb-5">Ноутбуки в вашей корзине</div>
                    {laptopCounts && laptopCounts.map(laptop => <LaptopInCart key={laptop.laptop.id} cartLaptop={laptop}/>)}
                </div>
                <div className="w-6/12 me-4">
                    <CartOrder laptops={laptops} />
                </div>
            </div>
        </div>
    );
};

export default CartPage;
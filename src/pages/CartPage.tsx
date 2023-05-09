import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../hooks/redux";
import LaptopItem from "../components/UI/laptop/LaptopItem";
import LaptopInCart from "../components/UI/laptop/LaptopInCart";
import {ICartLaptop, ILaptop} from "../models/ILaptop";


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
        return (<div>
            <div className="p-3 mx-auto mt-20 text-3xl mb-5 text-center bg-gray-300 w-6/12">У вас пока нету ноутбуков в корзине</div>
        </div>)
    }
    // console.log(laptops);

    return (
        <div className="px-3 mx-auto mt-20">
            <div className="text-3xl mb-5">Ноутбуки в вашей корзине</div>
            <div className="flex">
                <div className="w-5/12">
                    {laptopCounts && laptopCounts.map(laptop => <LaptopInCart key={laptop.laptop.id} cartLaptop={laptop}/>)}
                </div>
                <div className="w-7/12">

                </div>
            </div>
        </div>
    );
};

export default CartPage;
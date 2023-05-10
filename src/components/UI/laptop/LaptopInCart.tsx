import React, {FC, useState} from 'react';
import imageNotFound from "../../../assets/image-not-found.png";
import {ICartLaptop} from "../../../models/ILaptop";
import {useAppDispatch} from "../../../hooks/redux";
import {cartSlice} from "../../../store/reducers/CartSlice";
import {Button} from "@material-tailwind/react";

interface LaptopInCartProps {
    cartLaptop: ICartLaptop;
}

export const xMark = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>


const LaptopInCart:FC<LaptopInCartProps> = ({cartLaptop}) => {
    const laptop = cartLaptop.laptop;

    const [count, setCount] = useState(cartLaptop.count);

    const dispatch = useAppDispatch();

    const deleteLaptop = (e: any) => {
        dispatch(cartSlice.actions.removeFromCart(laptop));
        setCount(count - 1);
    }

    return (
        <div className="mb-3 bg-white">
            <div className="border rounded-xl border-gray-300">
                <div className="flex p-3 text-xl">
                    <div className="flex">
                        <div className="w-5/12">
                            <div className="h-30 w-30">
                                <img
                                    src={laptop.imageUrl ? laptop.imageUrl : imageNotFound}
                                    alt="img-blur-shadow"
                                    className="w-full h-full"
                                />
                            </div>
                        </div>

                        <div className="ps-3 flex flex-col space-y-3 w-full">
                            <div>
                                {laptop.name} {laptop.brand}
                            </div>
                            <div>
                                {laptop.price} сом
                            </div>
                            <div>
                                {count} {stucks(count)}
                            </div>
                        </div>
                    </div>

                    <div className="w-2/12">
                        <Button size="sm" color='white' className="hover:bg-red-300" onClick={deleteLaptop}>{xMark}</Button>
                    </div>


                </div>
            </div>
        </div>

    );
};

const stucks = (n: number) => {
    if(n === 1) return "штука";
    if(n >= 2 && n <= 4) return "штуки";
    return "штук";
}

export default LaptopInCart;
import React from 'react';
import {useAppSelector} from "../hooks/redux";
import LaptopItem from "../components/UI/laptop/LaptopItem";


const CartPage = () => {

    const {laptops} = useAppSelector(state => state.cartReducer);

    return (
        <div>
            {laptops && laptops.map(laptop => <LaptopItem key={laptop.id} laptop={laptop}/>)}
        </div>
    );
};

export default CartPage;
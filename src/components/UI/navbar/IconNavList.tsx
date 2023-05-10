import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Notification from "./Notification";
import useOutsideClick from "../../../hooks/useOutsideClick";
import avatar from "../../../assets/avatar.png";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {Menu, MenuHandler, MenuItem, MenuList} from "@material-tailwind/react";
import Cart from "./Cart";


const IconNavList = () => {


    const navigate = useNavigate();

    const icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-blue-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
    const link = "/favorites";

    return (
        <div>
            <div className="flex space-x-5 justify-end">

                <div onClick={() => navigate("/cart")}>
                    <Cart />
                </div>

                <div onClick={() => navigate(link)}>
                    {icon}
                </div>


                <div>
                    <Notification className="mt-3"/>
                </div>
            </div>

        </div>

    );
};

export default IconNavList;
import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Notification, {notificationIcon} from "./Notification";
import useOutsideClick from "../../../hooks/useOutsideClick";
import avatar from "../../../assets/avatar.png";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {Menu, MenuHandler, MenuItem, MenuList} from "@material-tailwind/react";

const itemsList = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-blue-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>,
        link: "/cart"
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-blue-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>,
        link: "/favorites"
    },

]

const IconNavList = () => {


    const navigate = useNavigate();



    return (
        <div>
            <div className="flex space-x-5 justify-end">
                {itemsList.map(item =>
                    <div key={item.link} onClick={() => navigate(item.link)}>
                        {item.icon}
                    </div>

                )}
                <div>
                    <Notification className="mt-3"/>
                </div>
            </div>

        </div>

    );
};

export default IconNavList;
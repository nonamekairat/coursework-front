import React, {useEffect, useState} from 'react';
import {Button, Input, Menu, MenuHandler, MenuItem, MenuList} from "@material-tailwind/react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import {laptopAPI} from "../../../services/LaptopService";
import LaptopItem from "../laptop/LaptopItem";
import NotificationItem from "../notification/NotificationItem";
import {notificationIcon} from "./Notification";

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>


const Search = () => {

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [trigger, {data: laptops, isLoading}] = laptopAPI.useLazyFetchAllBySearchQuery();


    const onChange = (e: any) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log(query)
            trigger(query)
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [query])



    return (

        <Menu dismiss={{
            itemPress: false,
        }} open={open} handler={setOpen} placement="left-start">
            <MenuHandler>

                <div className="flex" >
                    <Button className="" size="sm" onClick={()=> trigger(query)}>
                        <div className="flex space-x-2">
                            <SearchIcon/>
                        </div>
                    </Button>
                </div>
            </MenuHandler>
            <MenuList className="p-1 max-h-[600px] min-w-[700px] text-black">
                <Input size="lg" autoFocus={true} value={query} onChange={onChange} label="Поиск"/>
                {laptops && query ?
                    laptops.map(laptop =>
                        <MenuItem>
                        <LaptopItem
                            key={laptop.id}
                            viewType="small_card"
                            laptop={laptop}
                            onClick={() => setOpen(false)}
                        />
                        </MenuItem>
                    )
                    :
                    <Menu>
                        <div className="p-3 bg-white">Напишите что-то в поиск для получения результата!</div>
                    </Menu>
                }

            </MenuList>
        </Menu>


    );
};

export default Search;
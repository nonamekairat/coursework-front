import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input} from "@material-tailwind/react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import {laptopAPI} from "../../../services/LaptopService";
import LaptopItem from "../laptop/LaptopItem";
import {skipToken} from "@reduxjs/toolkit/query";
import {ILaptop} from "../../../models/ILaptop";

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>


const Search = () => {

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [trigger, {data: laptops, isLoading}] = laptopAPI.useLazyFetchAllBySearchQuery();



    const handleOpen = () => setOpen(true);




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

    const searchHandle = () => {
        // refetch();
    }

    const handleClickOutside = () =>{
        // todo: add if statement is open or not
        setOpen(false);
    }

    const ref = useOutsideClick(handleClickOutside);



    return (
        <div ref={ref}>
            <div className="flex" onClick={handleOpen}>
                <Input className="rounded-none rounded-l" value={query} onChange={onChange} label="Поиск"/>
                <Button className="rounded-none rounded-r" size="sm" onClick={searchHandle}><SearchIcon/></Button>
            </div>

            <div>
                {open && <div>
                    {laptops && query ?
                        laptops.map(laptop =>
                            <LaptopItem
                                key={laptop.id}
                                onClick={handleClickOutside}
                                viewType="small_card"
                                laptop={laptop}
                            />
                        )
                        :
                        <div className="p-3 bg-white">Напишите что-то в поиск для получения результата!</div>
                    }
                </div>
                }
            </div>

        </div>


    );
};

export default Search;
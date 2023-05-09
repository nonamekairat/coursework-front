import React, {FC} from 'react';
import {Button, Input} from "@material-tailwind/react";

interface CounterProps {
    value: number;
    maxValue: number;
    setValue: (value: number) => void;
}

const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>





const Counter:FC<CounterProps> = ({value, setValue, maxValue}) => {


    const onChange = (e: any) => {
        const val = e.target.value;
        if(val <= maxValue)
        setValue(e.target.value);
    }
    const decreaseValue = (e: any) => {
        if(value - 1 > 0)
        setValue(value - 1);
    }
    const increaseValue = (e: any) => {
        if(value + 1 < maxValue)
        setValue(value + 1);
    }

    return (
        <div className="flex">
            <div className="">
                <Button onClick={decreaseValue} size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg></Button>
            </div>
            <div className="px-1">
                <div className="flex flex-col items-end gap-6">
                    <div className="relative h-10 min-w-[60px]">
                        <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            value={value}
                            onChange={onChange}
                        />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            amount
                        </label>
                    </div>
                </div>
            </div>
            <div className="">
                <Button onClick={increaseValue} size="sm">{plusIcon}</Button>
            </div>
        </div>
    );
};

export default Counter;
import React, {FC, useState} from 'react';
import MySelect from "./MySelect";
import {IOption} from "../../../models/form/IOption";
import {IBrand, IBrandRequest, IHardware} from "../../../models/ILaptop";

import {MinusIcon, PlusIcon} from "@heroicons/react/24/outline";
import {Input} from "@material-tailwind/react";
import StandartButton from "../button/StandartButton";
import {brandAPI} from "../../../services/BrandService";


interface SelectBrandProps {
    brands: IBrand[] | undefined;
    changeBrand: (e: IHardware) => void;

}


const SelectBrand:FC<SelectBrandProps> = ({brands, changeBrand}) => { // todo replace with SelectWithAdd

    const [isAdd, setIsAdd] = useState(true);

    const [value, setValue] = useState("");

    const [add] = brandAPI.useAddBrandMutation();

    const clickAddButton = (e:any) => {
        e.preventDefault();
        setIsAdd(!isAdd)
    }
    const onChange = (e:any) => {
        setValue(e.target.value);
    }

    const addHardware = (e:any) => {
        e.preventDefault();
        setIsAdd(!isAdd);
        add({
            name: value
        } as IBrandRequest);
        setValue("");
    }


    if(brands){
        return <div className="flex">
            <div className="w-4/12">
                <MySelect
                    label="Brand"
                    options={brands.map((brand)=> {
                        return {value: brand, child: brand.name} as IOption;
                    })}
                    onChange={changeBrand}

                />
            </div>
            <div className="mt-3 mx-3 w-6/12">
                {isAdd ? <div>
                        <StandartButton onClick={clickAddButton}>
                            {React.createElement(PlusIcon, { className: "h-[18px] w-[18px]" })}
                        </StandartButton>
                    </div> :
                    <div className="flex">
                        <div className="mr-3 w-full">
                            <Input label="Brand" value={value} onChange={onChange}></Input>
                        </div>
                        <div className="mr-3">
                            <StandartButton onClick={addHardware}>
                                {React.createElement(PlusIcon, { className: "h-[18px] w-[18px]" })}
                            </StandartButton>
                        </div>
                        <div className="mr-3">
                            <StandartButton onClick={clickAddButton} className="bg-red-500">
                                {React.createElement(MinusIcon, { className: "h-[18px] w-[18px]" })}
                            </StandartButton>
                        </div>

                    </div>
                }
            </div>

        </div>


    }
    return <MySelect label="Brand" options={[]} onChange={changeBrand} />

}

export default SelectBrand;
import React, {FC, useState} from 'react';
import MySelect from "./MySelect";
import {IOption} from "../../../models/form/IOption";
import {IHardware, IHardwareRequest} from "../../../models/ILaptop";

import {MinusIcon, PlusIcon} from "@heroicons/react/24/outline";
import {Input} from "@material-tailwind/react";
import {hardwareAPI} from "../../../services/HardwareService";
import StandartButton from "../button/StandartButton";


interface SelectHardwareProps {
    hardwareType: string;
    hardwareList: IHardware[] | undefined;
    changeHardware: (e: IHardware) => void;
    defaultValue?: IHardware;
}


const SelectHardware:FC<SelectHardwareProps> = ({hardwareType, hardwareList, changeHardware, defaultValue}) => {
    //todo create hardwareType enum

    const [isAdd, setIsAdd] = useState(true);

    const [value, setValue] = useState("");

    const [add] = hardwareAPI.useAddHardwareMutation();


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
        setValue("");
        add({
            hardwareType: hardwareType,
            name: value
        } as IHardwareRequest)
    }



    if(hardwareList){
        const hardwareListByHardwareType = hardwareList.filter((h) => h.hardwareType == hardwareType);
        return <div className="flex items-center">
            <div className="w-5/12">
                <MySelect
                    label={hardwareType}
                    defaultValue={{value: defaultValue?.id, child: defaultValue?.name}}
                    options={hardwareListByHardwareType.map((hardware)=> {
                        return {value: hardware, child: hardware.name} as IOption;
                    })}
                    onChange={changeHardware}

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
                            <Input label={hardwareType} value={value} onChange={onChange}></Input>
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
    return <MySelect label={hardwareType} options={[]} onChange={changeHardware} />

}

export default SelectHardware;
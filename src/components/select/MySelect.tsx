import React, {FC} from 'react';
import {Select, Option} from "@material-tailwind/react";
import {IOption} from "../../models/form/IOption";

interface MySelectProps {
    label: string;
    options: IOption[];
    // initialValue?: string
    onChange: (e: any) => void;
    className?: string | undefined;
    variant?: variant | undefined;
    defaultValue?: IOption | undefined;
}
type variant = "standard" | "outlined" | "static";


const MySelect:FC<MySelectProps> = ({label, options, onChange, className,variant, defaultValue}) => {
    let finalLabel = label;

    if(defaultValue && defaultValue.child){
        finalLabel += ` (${defaultValue.child})`;
    }

    return (
        <div className={"mt-3 " + className}>
            <Select variant={variant} label={finalLabel} onChange={onChange}>
                {
                    options.map((val) => (
                        <Option  key={val.child} value={val.value}>{val.child}</Option>
                    ))
                }
            </Select>
        </div>

    );

};

export default MySelect;
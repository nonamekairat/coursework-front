import React, {FC} from 'react';
import {Select, Option} from "@material-tailwind/react";
import {IOption} from "../../../models/form/IOption";

interface MySelectProps {
    label: string;
    options: IOption[];
    onChange: (e: any) => void;
    className?: string | undefined;
}

const MySelect:FC<MySelectProps> = ({label, options, onChange, className}) => {
    return (
        <div className={"mt-3 " + className}>
            <Select label={label} onChange={onChange}>
                {
                    options.map((val) => (
                        <Option key={val.child} value={val.value}>{val.child}</Option>
                    ))
                }
            </Select>
        </div>

    );
};

export default MySelect;
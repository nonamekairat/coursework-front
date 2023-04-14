import React, {FC} from 'react';
import { Input, } from "@material-tailwind/react";
import {IPost} from "../../models/IPost";
import {IInput} from "../../models/form/IInput";

interface FormInputProps {
    inputProps: IInput;
    errorMessage: string;
    value: string;
    onChange: (e: any) => void;
}

const FormInput:FC<FormInputProps> = ({onChange, errorMessage, inputProps, value}) => {

    return (
        <div>
            <Input
                {...inputProps}
                onChange={onChange}
                size="lg"
                className=''
            />
            {errorMessage &&
                <span className='text-xs p-1 text-red-500'>{errorMessage}</span>
            }
        </div>

    );
}

export default FormInput;
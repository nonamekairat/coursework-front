import React, {FC} from 'react';
import {Input,} from "@material-tailwind/react";
import {IInput} from "../../../models/form/IInput";

interface FormInputProps {
    inputProps: IInput;
    errorMessage: string;
    onChange: (e: any) => void;
    className?: string | undefined;
}

const FormInput:FC<FormInputProps> = ({onChange, errorMessage, inputProps, className}) => {

    return (
        <div className={className}>
            <Input
                {...inputProps}
                onChange={onChange}
                size="lg"
            />
            {errorMessage &&
                <span className='text-xs p-1 text-red-500'>{errorMessage}</span>
            }
        </div>

    );
}

export default FormInput;
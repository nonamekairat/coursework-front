import React, {FC, ReactNode} from 'react';

import { Button } from "@material-tailwind/react";

interface ButtonProps {
    children?: ReactNode;
    variant: any;
    onClick: (e:any) => void;
    fullWidth: boolean;
}


const MyButton:FC<ButtonProps> = ({children,variant, onClick, fullWidth}) => {
    return (
        <Button variant={variant} onClick={onClick} fullWidth={fullWidth} className="">
            {children}
        </Button>
    );
};

export default MyButton;
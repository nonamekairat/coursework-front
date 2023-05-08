import React, {FC, ReactNode} from 'react';

import { Button } from "@material-tailwind/react";

interface ButtonProps {
    children?: ReactNode;
    onClick: (e:any) => void;
    className?: string | undefined;
}


const MyButton:FC<ButtonProps> = ({children, onClick, className}) => {
    return (
        <Button variant="gradient" size="sm" onClick={onClick} className={className}>
            {children}
        </Button>
    );
};

export default MyButton;
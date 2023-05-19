import React, {FC, ReactElement, ReactNode} from 'react';
import {Badge} from "@material-tailwind/react";

interface MyBadgeProps {
    length: number;
    children: ReactNode;
}

const MyBadge:FC<MyBadgeProps> = ({length, children}) => {

    if(length === 0) {
        return (
            <div>
                {children}
            </div>
        )
    }

    return (
        <Badge content={length}>
            {children}
        </Badge>
    );
};

export default MyBadge;
import React, {FC, Fragment, useState} from 'react';
import {typesAPI} from "../../../services/TypesService";
import {types} from "../../../util/Constants";
import MySelect from "../select/MySelect";
import {IOption} from "../../../models/form/IOption";
import {Button, Input, Popover, PopoverContent, PopoverHandler, Textarea, Typography} from "@material-tailwind/react";

interface OrderStatusProps {
    orderStatuses: string[]
    isChanging: boolean;
    value: string;
    setStatus: (e: string) => void;
}

const OrderStatus:FC<OrderStatusProps> = ({isChanging, value, setStatus, orderStatuses}) => {

    const onChange = (e: any) => {
        if(e) setStatus(e);
        else setStatus(value);
    }

    if(isChanging) return (
        <div>
            <MySelect label={value} className="-mt-0.5 w-full"
                      options={orderStatuses.map(status => {
                          return {value: status, child: status}
                      })} onChange={onChange} />
        </div>

    )

    return (
        <Fragment>
            {value}
        </Fragment>
    );

};

export default OrderStatus;
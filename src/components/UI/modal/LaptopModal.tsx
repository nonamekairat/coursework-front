import React, {FC} from 'react';
import {ILaptop} from "../../../models/ILaptop";
import { Fragment, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import LaptopContainer from "../laptop/LaptopContainer";

interface LaptopModalProps {
    laptops: ILaptop[];
    open: boolean;
    handleOpen: () => void;
}


const LaptopModal:FC<LaptopModalProps> = ({laptops, open, handleOpen}) => {
    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Ноутбуки из этого заказа</DialogHeader>
            <DialogBody divider>
                <LaptopContainer layout="col" viewType="small_card" laptops={laptops} />
            </DialogBody>

        </Dialog>
    );
};

export default LaptopModal;
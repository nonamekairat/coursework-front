import React, {FC} from 'react';
import {ILaptop} from "../../../models/ILaptop";
import {Card, CardBody, CardFooter, CardHeader, Typography} from "@material-tailwind/react";
import imageNotFound from "../../../assets/image-not-found.png";
import StandartButton from "../button/StandartButton";
import {useNavigate} from "react-router-dom";
import {getModel} from "../../../util/Functions";

interface LaptopItemProps {
    laptop: ILaptop;
    viewType?: LaptopItemType;
    className?: string;
    onClick?: () => void;
}

type LaptopItemType = "small_card" | "card" | "row";



const LaptopItem:FC<LaptopItemProps> = ({laptop, viewType, className, onClick}) => {

    // const model:string = laptop.hardwareList.map(hardware => hardware.name).join(" | ");
    const model = getModel(laptop);
    const navigate = useNavigate();

    const toLaptop = (e: any) => {
        e.preventDefault();
        if(onClick) onClick();
        navigate(`/laptops/${laptop.id}`);
    }

    if(viewType == "small_card"){
        return (
            <div onClick={toLaptop} className={"border rounded-xl border-gray-300 bg-white hover:bg-gray-100 " + className}>
                <div className="flex p-2 text-xl">
                    <div className="w-24">
                        <img
                            src={laptop.imageUrl ? laptop.imageUrl : imageNotFound}
                            alt="img-blur-shadow"
                            className="h-full"
                        />
                    </div>
                    <div className="ps-3">
                        <div className="flex">
                            {laptop.name} {laptop.brand}
                        </div>
                        <div>
                            {laptop.price} сом
                        </div>
                    </div>

                </div>
            </div>
        )
    }



    return (
        <div className={className}>
            <Card className="w-33">
                <CardHeader color="blue" className="relative h-56 w-56 mx-auto">
                    <img
                        src={laptop.imageUrl ? laptop.imageUrl : imageNotFound}
                        alt="img-blur-shadow"
                        className="h-full"
                    />
                </CardHeader>
                <CardBody className="text-center">
                    <Typography variant="h6" className="mb-1">
                        {laptop.name} {"# " + laptop.id}
                    </Typography>
                    <Typography className="line-clamp-3 font-semibold ">
                        {model}
                    </Typography>
                </CardBody>
                <CardFooter divider className="flex items-center justify-between py-3">
                    <Typography variant="small">{laptop.price}</Typography>
                    <Typography variant="small" color="gray" className="flex gap-1">
                        <StandartButton onClick={toLaptop}>узнать больше</StandartButton>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    );
};


export default LaptopItem;
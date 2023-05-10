import React, {FC} from 'react';
import LaptopItem, {LaptopItemType} from "./LaptopItem";
import {ILaptop} from "../../../models/ILaptop";

interface LaptopContainerProps {
    laptops: ILaptop[] ;
    viewType?: LaptopItemType;
    layout?: laptopLayout;
}
export type laptopLayout = "grid" | "col";

const LaptopContainer:FC<LaptopContainerProps> = ({laptops, viewType, layout}) => {

    if(layout === "col") return (
        <div className="flex flex-col space-y-2">
            {
                laptops.map(laptop => <LaptopItem viewType={viewType}  key={laptop.id} laptop={laptop}/>)
            }

        </div>
    )

    return (
        <div className="grid grid-cols-3 gap-2 gap-y-5">
            {
                laptops.map(laptop => <LaptopItem viewType={viewType}  key={laptop.id} laptop={laptop}/>)
            }

        </div>
    );
};

export default LaptopContainer;
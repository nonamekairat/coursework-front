import React, {FC} from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PaginationListProps {
    active: number;
    setActive: (active: number) => void;
    total: number;
}

const PaginationList:FC<PaginationListProps> = ({active, setActive, total}) => {

    const getItemProps = (index: any) =>
        ({
            variant: active === index ? "filled" : "text",
            color: active === index ? "blue" : "blue-gray",
            onClick: () => setActive(index),
        } as any);

    const next = () => {
        if (active === total) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    const getTotalList = () => {
        let totalList = [];
        for (let i = 1; i < total + 1; i++) {
            totalList.push(i);
        }
        return totalList;
    }

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> прошлая страница
            </Button>
            <div className="flex items-center gap-2">
                {getTotalList().map(value => <IconButton key={value} {...getItemProps(value)}>{value}</IconButton>)}
            </div>
            <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === total}
            >
                следующая страница
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default PaginationList;
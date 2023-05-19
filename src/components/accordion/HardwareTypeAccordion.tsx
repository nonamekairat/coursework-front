import React, {FC, Fragment, useState} from "react";
import {Accordion, AccordionBody, AccordionHeader, Checkbox,} from "@material-tailwind/react";
import {IHardware} from "../../models/ILaptop";

interface IIconProps {
    id: any;
    open: any;
}

const Icon:FC<IIconProps> = ({ id, open}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
                id === open ? "rotate-180" : ""
            } h-5 w-5 transition-transform`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

interface HardwareTypeAccordionProps {
    hardwareType: string;
    hardwareList: IHardware[] | undefined;
    selectHardware: (e: any) => void;
}


const HardwareTypeAccordion:FC<HardwareTypeAccordionProps> = ({hardwareType, hardwareList, selectHardware}) => {
    const [open, setOpen] = useState(0);

    const handleOpen = (value: any) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Fragment>
            <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader className="text-sm px-3" onClick={() => handleOpen(1)}>
                    {hardwareType}
                </AccordionHeader>
                <AccordionBody>
                    {hardwareList ?
                        hardwareList.map(hardware =>
                            <Checkbox
                                value={hardware.name}
                                key={hardware.id}
                                label={hardware.name}
                                onChange={selectHardware}
                            />)
                        : <div>not found</div>
                    }

                </AccordionBody>
            </Accordion>
        </Fragment>
    );
}

export default HardwareTypeAccordion;
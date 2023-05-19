import {FC, useState} from 'react';
import {Button, Dialog, DialogBody, DialogHeader} from "@material-tailwind/react";
import {ILaptop} from "../../models/ILaptop";
import {laptopAPI} from "../../services/LaptopService";
import {XMarkIcon} from "@heroicons/react/24/solid";
import AdminComponent from "../AdminComponent";
import {useNavigate} from "react-router-dom";

interface LaptopChangeComponentProps {
    laptop: ILaptop;
}


const LaptopChangeComponent:FC<LaptopChangeComponentProps> = ({laptop}) => {

    const [deleteLaptop] = laptopAPI.useDeleteLaptopMutation();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => setOpen(!open);

    const changeHandle = () => {
        navigate(`/laptops/${laptop.id}/update`)
    }

    const deleteHandle = () => {
        deleteLaptop(laptop.id);
        handleOpen();
    }


    return (
            <AdminComponent>
            <div className="border-4 rounded-3xl">
                <div className="p-6">

                    <div className="flex flex-col space-y-2">
                        <Button color="blue-gray" className="rounded-3xl" onClick={changeHandle}>изменить</Button>
                        <Button color="light-blue" className="rounded-3xl" onClick={handleOpen}>удалить</Button>
                    </div>
                    {/*todo: create component*/}
                    <Dialog size="xs" open={open} handler={handleOpen}>
                        <div className="flex items-center justify-between">
                            <DialogHeader>Подтвердите действие</DialogHeader>
                            <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
                        </div>
                        <DialogBody divider className="flex items-center justify-around">
                            <Button variant="outlined" onClick={handleOpen}>
                                отменить
                            </Button>
                            <Button variant="gradient" color="red" onClick={deleteHandle}>
                                удалить
                            </Button>
                        </DialogBody>
                    </Dialog>

                </div>
            </div>
            </AdminComponent>

    );
};

export default LaptopChangeComponent;
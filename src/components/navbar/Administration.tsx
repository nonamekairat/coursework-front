import React, {useState} from 'react';
import {WrenchIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {Button, Drawer, IconButton, List, ListItem, ListItemPrefix, Typography} from "@material-tailwind/react";
import {ClipboardDocumentListIcon} from "@heroicons/react/24/solid";
import {PlusCircle} from "heroicons-react";
import {useNavigate} from "react-router-dom";

const Administration = () => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const closeDrawer = () => setOpen(false);
    const openDrawer = () => setOpen(true);

    const clickHandle = (link: string) => {
        closeDrawer()
        navigate(link)
    }

    return (
        <React.Fragment>
            <div className="flex justify-end pe-10 z-50 fixed right-0" style={{top: 72}}>
                <Button onClick={openDrawer} className="rounded-t-none border-none drop-shadow" variant="filled" color="white">

                    <div className="flex items-center gap-2">
                        <WrenchIcon className="w-6 h-6" />
                        Администрирование
                    </div>

                </Button>
            </div>

            <Drawer placement="right" open={open} onClose={closeDrawer}>

                <div className="mb-2 flex items-center justify-between p-4">
                    <Typography variant="h5" color="blue-gray">
                        Администрирование
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </div>
                <List className="">
                    <ListItem onClick={() => clickHandle("/laptop/create")}>
                        <ListItemPrefix>
                            <PlusCircle className="h-5 w-5" />
                        </ListItemPrefix>
                        Создание ноутбука
                    </ListItem>

                    <ListItem onClick={() => clickHandle("/admin/orders")}>
                        <ListItemPrefix>
                            <ClipboardDocumentListIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Просмотр заказов
                    </ListItem>

                    <ListItem onClick={() => clickHandle("/admin/create")}>
                        <ListItemPrefix>
                            <ClipboardDocumentListIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Добавить нового администратора
                    </ListItem>

                </List>

            </Drawer>
        </React.Fragment>
    );
};

export default Administration;
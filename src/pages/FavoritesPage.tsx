import { Fragment, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";



const FavoritesPage = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <Fragment>
            <Button onClick={handleOpen} variant="gradient">
                Open Dialog
            </Button>

        </Fragment>
    );
};

export default FavoritesPage;
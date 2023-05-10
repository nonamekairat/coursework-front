import React, {FC, useState} from 'react';
import {IUser} from "../../../models/user/IUser";
import avatar from "../../../assets/avatar.png";
import {Avatar, Button, IconButton, ListItem, ListItemPrefix, MenuItem, Typography} from "@material-tailwind/react";
import {imageAPI} from "../../../services/ImageService";
import {ILaptop} from "../../../models/ILaptop";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {PlusCircle} from "heroicons-react";

interface UserInformationProps {
    user: IUser | undefined;
}

const UserInformation:FC<UserInformationProps> = ({user}) => {

    
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadImage] = imageAPI.useSaveMyAvatarMutation();

    const updateImage = (e: any) => {
        setSelectedImage(e.target.files[0])
    }
    const submitImage = () => {
        let data = new FormData();
        if(selectedImage){
            data.append('file', selectedImage);
            uploadImage({data: data});
        }
        setSelectedImage(null);
    }
    const cancelAction = () => {
        setSelectedImage(null);
    }
    
    
    return (
        <div className="">
            {user?.imageUrl ? <div></div> : selectedImage ?
                <div className="flex">
                    <ListItem onClick={submitImage} className="justify-center">
                        <ListItemPrefix>
                            <CheckIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Загрузить
                    </ListItem>

                    <ListItem onClick={cancelAction} className="justify-center">
                        <ListItemPrefix>
                            <XMarkIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Отменить
                    </ListItem>
                </div>
                :
                <input
                type="file"
                name="file"
                onChange={updateImage}
                className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
            />}
            <div className="flex justify-center">
                <Avatar src={user?.imageUrl ? user?.imageUrl : selectedImage ? URL.createObjectURL(selectedImage) : avatar}
                        alt="not found"
                        className="w-64 h-64"/>
            </div>

            <div className="text-center font-semibold">
                <Typography variant="lead">
                    {user ? user.email : "адресс электронной почты"}
                </Typography>
            </div>
        </div>

    );
};

export default UserInformation;
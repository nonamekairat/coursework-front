import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import {Card, CardBody, CardFooter, CardHeader, Typography,} from "@material-tailwind/react";
import FormInput from '../components/input/FormInput';
import {IRegister} from "../models/user/IRegister";
import {IInput} from "../models/form/IInput";
import {userAPI} from "../services/UserService";
import {IToken} from "../models/IToken";
import {useAppDispatch} from "../hooks/redux";
import {tokenSlice} from "../store/reducers/TokenSlice";
import MyButton from "../components/button/MyButton";
import RegisterComponent from "../components/RegisterComponent";
import MessagePage from "./MessagePage";

// interface IRegisterValue extends IRegister {
//     confirmPassword: string;
// }

export type IRegisterValue = {
    [key: string]: string;
}


const CreateAdminPage = () => {

    const [register] = userAPI.useRegisterAdminMutation();

    const label = "Создать администратора";

    const sendLoginRequest = async (values: IRegisterValue) => {

        await register(values as unknown as IRegister).unwrap()
            .then((message: string) => {
                return (
                    <MessagePage message={message} />
                )
            }).catch((response) => {
                if(response.status !== 400)
                    return (
                    <MessagePage message={response.message} />
                )
            })
    }


    return (
        <RegisterComponent label={label} sendRequest={sendLoginRequest} />

    );
}


export default CreateAdminPage;
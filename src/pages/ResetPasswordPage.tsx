import React, {useState} from 'react';
import {Alert, Card, CardBody, CardFooter, CardHeader, Input, Typography} from "@material-tailwind/react";
import MyButton from "../components/button/MyButton";
import {Link, useNavigate, useParams} from "react-router-dom";
import {passwordAPI} from "../services/PasswordService";
import MessagePage from "./MessagePage";
import {IResetPassword, IResetPasswordWithToken} from "../models/IResetPassword";


const ResetPasswordPage = () => {

    const params = useParams();
    let token = "";
    if(params.token){
        token = params.token;
    }


    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [reset, {isError: apiError, error}] = passwordAPI.useResetPasswordMutation();


    const confirmHandle = (e: any) => {
        e.preventDefault();
        const dto = {
            resetPasswordDto: {
                password: password,
                confirmPassword: confirmPassword,
            } as IResetPassword,
            token: token,
        } as IResetPasswordWithToken;
        reset(dto).unwrap().then((response) => {
            return <MessagePage message={response} />
        }).catch((response) => {
            if(response.originalStatus == 200) navigate('/login');
            console.log(response);
            setErrorMessage(response.data.errors[0]);

            // setErrorMessage(response);
            setIsError(true);
        })
    }
    const onChangePassword = (e: any) => {
        setPassword(e.target.value);
    }
    const onChangeConfirmPassword = (e: any) => {
        setConfirmPassword(e.target.value);
    }


    return (
        <div className="container mx-auto mt-20">
            <Card className="w-96 mx-auto">
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Активация пароля
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">

                    <Alert
                        open={isError}
                        color="red"
                    >{errorMessage}</Alert>
                    <Input type="password" label="Пароль" value={password} onChange={onChangePassword} />
                    <Input type="password" label="Повторите пароль" value={confirmPassword} onChange={onChangeConfirmPassword} />

                </CardBody>
                <CardFooter className="pt-0">
                    <MyButton variant="gradient" onClick={confirmHandle} fullWidth>
                        отправить
                    </MyButton>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Уже есть подтвержденный аккаунт?
                        <Typography
                            as="span"
                            variant="small"
                            color="blue"
                            className="ml-1 font-bold"
                        >
                            <Link to="/login" className="ml-1 font-bold">Sign in</Link>
                        </Typography>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ResetPasswordPage;
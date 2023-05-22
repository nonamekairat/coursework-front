import React, {useState} from 'react';
import {Alert, Card, CardBody, CardFooter, CardHeader, Input, Typography} from "@material-tailwind/react";
import MyButton from "../components/button/MyButton";
import {Link, useNavigate} from "react-router-dom";
import {passwordAPI} from "../services/PasswordService";
import MessagePage from "./MessagePage";

const ForgotPasswordPage = () => {

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [trigger, result] = passwordAPI.useLazyForgotPasswordQuery();


    const confirmHandle = (e: any) => {
        e.preventDefault();
        trigger(email).unwrap().then((response) => {
            navigate('/password/token');
        }).catch((response) => {
            if(response.originalStatus == 200) navigate('/password/token');
            console.log(response);
            setErrorMessage(response.data.errors[0]);
            setIsError(true);
        })

    }
    const onChange = (e: any) => {
        setEmail(e.target.value);
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
                        Забыли пароль?
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">

                    <Alert
                        open={isError}
                        color="red"
                    >{errorMessage}</Alert>
                    <Input label="Вас email" value={email} onChange={onChange} />

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

export default ForgotPasswordPage;
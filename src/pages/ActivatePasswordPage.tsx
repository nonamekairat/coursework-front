import React, {useEffect, useState} from 'react';
import {Alert, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Typography} from "@material-tailwind/react";
import FormInput from "../components/UI/input/FormInput";
import MyButton from "../components/UI/button/MyButton";
import {Link, useNavigate} from "react-router-dom";
import {userAPI} from "../services/UserService";

const ActivatePasswordPage = () => {

    const [isError, setIsError] = useState(false);
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const [activate, {isError: apiError}] = userAPI.useActivatePasswordMutation();


    const confirmHandle = (e: any) => {
        e.preventDefault();
        activate(token)
        if(apiError){
            setIsError(true)
            return;
        }
        navigate("/login");

        //     .unwrap().then(response => {
        //     setIsError(false)
        //     navigate("/login")
        // }).catch(response => {
        //     setIsError(true)
        // });
    }
    // useEffect(() => {
    //     if(apiError){
    //         setIsError(true)
    //     }else {
    //         setIsError(false)
    //         navigate("/login")
    //     }
    // }, [activate])
    const onChange = (e: any) => {
        setToken(e.target.value);
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
                    >Не правильный токен</Alert>
                    <Input label="Токен" value={token} onChange={onChange} />

                </CardBody>
                <CardFooter className="pt-0">
                    {/* <MyButton id="submit" type="button" onClick={sendLoginRequest}>Login</MyButton> */}
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

export default ActivatePasswordPage;
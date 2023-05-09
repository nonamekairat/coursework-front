import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import {Alert, Card, CardBody, CardFooter, CardHeader, Checkbox, Typography,} from "@material-tailwind/react";
import FormInput from "../components/UI/input/FormInput";
import MyButton from "../components/UI/button/MyButton";
import {useAppDispatch} from "../hooks/redux";
import {userAPI} from "../services/UserService";
import {IAuthenticate} from "../models/user/IAuthenticate";
import {tokenSlice} from "../store/reducers/TokenSlice";
import {IToken} from "../models/IToken";


type IAuthenticateValue = {
    [key: string]: string;
}

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: ""
    } as IAuthenticateValue);
    const [isError, setisError] = useState(false);

    const inputs = [
        {
            id: "email",
            name: "email",
            type: "email",
            label: "Email",
            required: true,
        },
        {
            id: "password",
            name: "password",
            type: "password",
            label: "Password",
            required: true,
        },
    ]

    const onChange = (e: any) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const dispatch = useAppDispatch();
    const [authenticate] = userAPI.useAuthenticateUserMutation();

    const sendLoginRequest = async (e: any) => {
        e.preventDefault()

        await authenticate(values as unknown as IAuthenticate).unwrap()
            .then((token: IToken) => {
                dispatch(tokenSlice.actions.tokenSet(token))
                navigate("/")
            }
            ).catch((response:any) => {
                setisError(false);
                if(response.status == 403) setisError(true);
                // alert(response.message);
        })



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
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">

                    <Alert
                        open={isError}
                        color="red"
                    >Wrong password or email.</Alert>

                    {
                        inputs.map((input) => (
                            <FormInput
                                key={input.id}
                                inputProps={input}
                                errorMessage={""} // todo: remake
                                onChange={onChange}
                            />
                        ))
                    }
                    <div className="-ml-2.5">
                        <Checkbox label="Remember Me" />
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    {/* <MyButton id="submit" type="button" onClick={sendLoginRequest}>Login</MyButton> */}
                    <MyButton variant="gradient" onClick={sendLoginRequest} fullWidth>
                        Sign In
                    </MyButton>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Don't have an account?
                        <Typography
                            as="span"
                            variant="small"
                            color="blue"
                            className="ml-1 font-bold"
                        >
                            <Link to="/register" className="ml-1 font-bold">Sign up</Link>
                        </Typography>
                    </Typography>
                </CardFooter>
            </Card>
        </div>

    );
};

export default Login;
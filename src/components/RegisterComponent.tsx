import React, {FC, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {IInput} from "../models/form/IInput";
import {Card, CardBody, CardFooter, CardHeader, Typography} from "@material-tailwind/react";
import FormInput from "./input/FormInput";
import MyButton from "./button/MyButton";
import {IRegisterValue} from "../pages/RegisterPage";


interface RegisterComponentProps {
    sendRequest: (values: IRegisterValue) => any;
    label?: string;
}


const RegisterComponent:FC<RegisterComponentProps> = ({sendRequest, label}) => {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        password: "",
        confirmPassword: "",
    } as IRegisterValue);
    const [errors, setErrors] = useState({
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        password: "",
        confirmPassword: ""
    } as IRegisterValue )

    const inputs:IInput[] = [
        {
            id: "email",
            name: "email",
            type: "email",
            label: "Email",
            required: true,
        },
        {
            id: "username",
            name: "username",
            type: "text",
            label: "Username",
            required: true,
        },
        {
            id: "firstName",
            name: "firstName",
            type: "text",
            label: "First name",
            required: false,
        },
        {
            id: "lastName",
            name: "lastName",
            type: "text",
            label: "Last name",
            required: false,
        },
        {
            id: "phoneNumber",
            name: "phoneNumber",
            type: "tel",
            label: "Phone number",
            required: false,
        },
        {
            id: "address",
            name: "address",
            type: "text",
            label: "Address",
            required: false,
        },
        {
            id: "password",
            name: "password",
            type: "password",
            label: "password",
            required: true,
        },
        {
            id: "confirmPassword",
            name: "confirmPassword",
            type: "password",
            label: "Confirm password",
            required: true,
        },
    ]

    const onChange = (e:any) => {
        setValues({...values, [e.target.name]: e.target.value});
        // console.log();
    }
    const sendLoginRequest = async (e:any) => {  // todo replace any with object
        e.preventDefault()
        // console.log(values);
        sendRequest(values).catch((response:any) => { // todo replace any with object
            // console.log(response)
            // console.log(response.data.errors)
            setErrors({
                email: "",
                username: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                password: "",
                confirmPassword: ""
            })
            for(let error of response.data.errors){
                // console.log(error);
                let kyz = Object.keys(error);
                const key = kyz[0];
                const value = error[key];
                setErrors(prevErrors => (
                    { ...prevErrors,
                        [key]: value}
                ));
            }
            if(values['confirmPassword'] !== values['password']){
                setErrors(prevErrors => (
                    { ...prevErrors,
                        ['confirmPassword']: 'passwords should match'}
                ));
            }
        });
    }


    return (
        <div className="container mx-auto mt-20">
            <Card className="w-96 mx-auto">
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white" className="text-center">
                        {label}
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    {
                        inputs.map((input) => (
                            <FormInput
                                key={input.id}
                                inputProps={input}
                                errorMessage={errors[input.name]}
                                onChange={onChange}/>
                        ))
                    }

                </CardBody>
                <CardFooter className="pt-0">
                    {/* <MyButton id="submit" type="button" onClick={sendLoginRequest}>Login</MyButton> */}
                    <MyButton variant="gradient" onClick={sendLoginRequest} fullWidth>
                        {label}
                    </MyButton>
                    {label ? <div>

                    </div> :
                        <Typography variant="small" className="mt-6 flex justify-center">
                            Already have an account?
                            <Typography
                                as="span"
                                variant="small"
                                color="blue"
                                className="ml-1 font-bold"
                            >
                                <Link to="/login">Sign in</Link>

                            </Typography>
                        </Typography>
                    }

                </CardFooter>
            </Card>
        </div>

    );
}


export default RegisterComponent;
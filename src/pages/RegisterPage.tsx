import React from 'react';
import {useNavigate} from "react-router-dom";
import {IRegister} from "../models/user/IRegister";
import {userAPI} from "../services/UserService";
import {IToken} from "../models/IToken";
import {useAppDispatch} from "../hooks/redux";
import {tokenSlice} from "../store/reducers/TokenSlice";
import RegisterComponent from "../components/RegisterComponent";

// interface IRegisterValue extends IRegister {
//     confirmPassword: string;
// }

export type IRegisterValue = {
    [key: string]: string;
}


const RegisterPage = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const [register] = userAPI.useRegisterUserMutation();

    const sendLoginRequest = async (values: IRegisterValue) => {  // todo replace any with object

        // console.log(values);

        await register(values as unknown as IRegister).unwrap()
            .then((token: IToken) => {
                dispatch(tokenSlice.actions.tokenSet(token))
                navigate("/password/activate")
            }).catch((response: any) => {
                if(response.status !== 400) navigate("/password/activate")
            })
    }


    return (
        <RegisterComponent sendRequest={sendLoginRequest} label="Sign up"  />

    );
}


export default RegisterPage;
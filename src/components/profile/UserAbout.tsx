import React, {FC, ReactNode, useState} from 'react';
import {userAPI} from "../../services/UserService";
import {useAppSelector} from "../../hooks/redux";
import {useUserLoad} from "../../hooks/useUserLoad";
import {CheckIcon, PencilIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {IconButton, Input} from "@material-tailwind/react";
import {IUser} from "../../models/user/IUser";
import {User} from "heroicons-react";


const lines = [
    {
    label: 'Имя',
    line: 'firstName',
    },
    {
        label: 'Фамилия',
        line: 'lastName',
    },
    {
        label: 'Логин',
        line: 'username',
    },
    {
        label: 'Номер телефона',
        line: 'phoneNumber',
    },
    {
        label: 'Адресс',
        line: 'address',
    },
    {
        label: 'Электронная почта',
        line: 'email',
    }



]

const UserAbout = () => {
    const {accessToken: accessToken} = useAppSelector(state => state.tokenReducer)
    const [trigger, {data: user, error, isLoading}] = userAPI.useLazyFetchUserQuery();
    useUserLoad(trigger, accessToken);

    if(!user) return <div>Пользователь не найден</div>
    return (
        <UserInfo user={user} />
    )
}
interface props {
    user: IUser;
}
const UserInfo:FC<props> = ({user}) => {

    const [changeInfo, {}] = userAPI.useChangeInfoMutation();
    const [localUser, setLocalUser] = useState<IUser>(user);
    const [isChanging, setIsChanging] = useState(false);

    const changeButton = () => {
        setIsChanging(!isChanging);
    }

    const changeInfoHandle = () => {
        changeInfo({...localUser})
        changeButton()
    }

    const cancelChangingHandle = () => {
        setLocalUser(user);
        changeButton()
    }

    return (
        <div className="bg-white border p-3 shadow-sm rounded relative">
            <div className="">
                <div className="flex justify-end">
                    {isChanging ?
                        <div className="flex">
                            <IconButton onClick={changeInfoHandle} variant="text" color="blue-gray">
                                <CheckIcon className="h-5 w-5" />
                            </IconButton>
                            <IconButton onClick={cancelChangingHandle} variant="text" color="blue-gray">
                                <XMarkIcon className="h-5 w-5" />
                            </IconButton>
                        </div>
                        :
                        <IconButton onClick={changeButton} variant="text" color="blue-gray">
                            <PencilIcon className="h-4 w-4" />
                        </IconButton>
                    }
                </div>

                <div className="text-gray-700 my-2">
                    <div className="grid md:grid-cols-2 text-lg">
                        {lines.map((line, index) =>{
                            let className;
                            if(index > 2){
                                className = "col-start-1"
                            }

                            return <InfoLine
                            label={line.label}
                            isChanging={isChanging}
                            user={localUser}
                            setUser={setLocalUser}
                            line={line.line}
                            className={className}
                            />
                        }

                        )

                        }

                    </div>
                </div>
            </div>

        </div>
    );
};
interface InfoLineProps{
    label: string;
    user: IUser;
    line: string;
    setUser: (e: any) => void;
    isChanging: boolean;
    className?: string;
}

const InfoLine:FC<InfoLineProps> = ({user, setUser, line = "firstName", isChanging, label, className}) => {

    const onChange = (e: any) => {
        console.log(line);
        console.log(e.target.value);
        console.log(user);
        setUser({...user, [line]: e.target.value})
    }
    // @ts-ignore
    const value = user[line];

    return (
        <div className="grid grid-cols-2 " >
            <div className={"px-4 py-2 font-semibold" + className}>{label}</div>
            {isChanging ?
                <div>
                    <Input className="px-4 py-2" size="md" value={value} onChange={onChange}/>
                </div>
                :
                <React.Fragment>
                <div className="px-4 py-2">{value ? value : "пусто"}</div>
                </React.Fragment>
            }


        </div>
    )
}

export default UserAbout;
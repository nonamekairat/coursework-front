import React from 'react';
import {userAPI} from "../../../services/UserService";
import {useAppSelector} from "../../../hooks/redux";
import {useUserLoad} from "../../../hooks/useUserLoad";


const UserAbout = () => {

    const {accessToken: accessToken} = useAppSelector(state => state.tokenReducer)
    const [trigger, {data: user, error, isLoading}] = userAPI.useLazyFetchUserQuery();

    useUserLoad(trigger, accessToken);

    if(!user) return <div>Пользователь не найден</div>
    return (
        <div className="bg-white border p-3 shadow-sm rounded">

            <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-lg">
                    <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Имя</div>
                        <div className="px-4 py-2">{user.firstName ? user.firstName : "пусто"}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Фамилия</div>
                        <div className="px-4 py-2">{user.lastName ? user.lastName : "пусто"}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Логин</div>
                        <div className="px-4 py-2">{user.username ? user.username : "пусто"}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Номер</div>
                        <div className="px-4 py-2">{user.phoneNumber ? user.phoneNumber : "пусто"}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Адрес</div>
                        <div className="px-4 py-2">{user.address ? user.address : "пусто"}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Электронная почта</div>
                        <div className="px-4 py-2">
                            <a className="text-blue-800">{user.email ? user.email : "пусто"}</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserAbout;
import {FC, Fragment, ReactElement, ReactNode} from 'react';
import {useAppSelector} from "../hooks/redux";
import {userAPI} from "../services/UserService";
import {Role} from "../models/user/IUser";
import {useUserLoad} from "../hooks/useUserLoad";

interface AdminComponent {
    children?: ReactNode | ReactElement;
}

const AdminComponent:FC<AdminComponent> = ({children}) => {

    const {accessToken: accessToken} = useAppSelector(state => state.tokenReducer)
    const [trigger, {data: user, error, isLoading}] = userAPI.useLazyFetchUserQuery();

    useUserLoad(trigger, accessToken);

    if(accessToken && user && user.role === Role.ROLE_ADMIN){
        return (
            <Fragment>
                {children}
            </Fragment>
        )
    }

    return (
        <Fragment>
        </Fragment>
    );
};

export default AdminComponent;
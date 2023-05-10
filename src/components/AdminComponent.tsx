import {FC, Fragment, ReactElement, ReactNode} from 'react';
import {useAppSelector} from "../hooks/redux";
import {userAPI} from "../services/UserService";
import {Role} from "../models/user/IUser";

interface AdminComponent {
    children?: ReactNode | ReactElement;
}

const AdminComponent:FC<AdminComponent> = ({children}) => {

    const {accessToken} = useAppSelector(state => state.tokenReducer);
    const {data: user} = userAPI.useFetchUserQuery(null);

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
import {FC, ReactElement, ReactNode} from 'react';
import {useAppSelector} from "../hooks/redux";

interface AuthorizedComponentProps {
    children?: ReactNode | ReactElement;
}

const AuthorizedComponent:FC<AuthorizedComponentProps> = ({children}) => {

    const {accessToken} = useAppSelector(state => state.tokenReducer);


    return (
        <div>
            {accessToken && children}
        </div>

    );
};

export default AuthorizedComponent;
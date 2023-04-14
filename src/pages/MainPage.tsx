import React from 'react';
import {useAppSelector} from "../hooks/redux";

const MainPage = () => {
    const {token} = useAppSelector(state => state.tokenReducer);

    return (
        <div className="container mx-auto mt-20">
            jwt token -  {token}
        </div>
    );
};

export default MainPage;
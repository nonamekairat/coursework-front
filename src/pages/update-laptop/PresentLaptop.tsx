import React from 'react';
import {useParams} from "react-router-dom";
import {laptopAPI} from "../../services/LaptopService";
import MessagePage from "../MessagePage";
import UpdateLaptopPage from "./UpdateLaptopPage";

const PresentLaptop = () => {
    const params = useParams();
    let id = 0;
    if(params.id){
        id = parseInt(params.id);
    }

    const {data: baseLaptop} = laptopAPI.useFetchLaptopByIdQuery(id);

    if(!baseLaptop){
        return (
            <MessagePage />
        )
    }

    return (
        <UpdateLaptopPage baseLaptop={baseLaptop} />
    )
};

export default PresentLaptop;
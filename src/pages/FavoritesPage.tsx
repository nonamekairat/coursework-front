import React from "react";
import FavoriteLaptopsContainer from "../components/UI/laptop/FavoriteLaptopsContainer";


const FavoritesPage = () => {

    return (
        <div className="px-3 mx-auto mt-20">

        <div>
            <div className="text-3xl text-center mb-20">
                Ваши избранные ноутбуки:
            </div>

            <FavoriteLaptopsContainer/>
        </div>
        </div>

    );
};

export default FavoritesPage;
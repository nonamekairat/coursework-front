import {favoriteAPI} from "../../services/FavoriteService";
import MessagePage from "../../pages/MessagePage";
import AddToFavoriteButton from "../button/AddToFavoriteButton";
import LaptopItem from "./LaptopItem";
import React from "react";

const FavoriteLaptopsContainer = () => {

    const {data: favorites} = favoriteAPI.useFetchFavoritesQuery(null); //todo: add pagination
    const [deleteFavorite] = favoriteAPI.useDeleteFavoriteMutation();

    if(favorites && favorites.length === 0){
        return (<MessagePage message="У вас пока нету любимых товаров" />)
    }

    return (
            <div className="grid grid-cols-4 gap-3 gap-y-5 w-12/12 mx-auto">
                {favorites && favorites.map(favorite =>
                    <div key={favorite.id}>
                        <div className="flex relative z-50 mx-auto">
                            <div className="w-full"></div>
                            <AddToFavoriteButton onClick={() => {deleteFavorite(favorite.id)}}  favorite={true}/>
                        </div>

                        <LaptopItem laptop={favorite.laptop} />
                    </div>
                )

                }
            </div>

    );
};

export default FavoriteLaptopsContainer;
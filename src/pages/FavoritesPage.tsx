import React from "react";
import {favoriteAPI} from "../services/FavoriteService";
import LaptopItem from "../components/UI/laptop/LaptopItem";
import AddToFavoriteButton from "../components/UI/button/AddToFavoriteButton";
import MessagePage from "./MessagePage";


const FavoritesPage = () => {

    const {data: favorites} = favoriteAPI.useFetchFavoritesQuery(null); //todo: add pagination
    const [deleteFavorite] = favoriteAPI.useDeleteFavoriteMutation();

    if(favorites && favorites.length === 0){
        return (<MessagePage message="У вас пока нету любимых товаров" />)
    }

    return (

        <div className="px-3 mx-auto mt-20">
            <div className="text-3xl text-center mb-20">
                Ваши избранные ноутбуки:
            </div>
            <div className="grid grid-cols-4 gap-3 gap-y-5 w-9/12 mx-auto">
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
        </div>



    );
};

export default FavoritesPage;
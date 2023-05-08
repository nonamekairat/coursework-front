import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from "../hooks/redux";
import {IFavoriteRequest, ILaptop} from "../models/ILaptop";
import {Link, useNavigate, useParams} from "react-router-dom";
import {laptopAPI} from "../services/LaptopService";
import NotFoundPage from "./NotFoundPage";
import LaptopItem from "../components/UI/laptop/LaptopItem";
import {typesAPI} from "../services/TypesService";
import {types} from "../util/Constants";
import {getModel} from "../util/Functions";
import imageNotFound from "../assets/image-not-found.png";
import {brandAPI} from "../services/BrandService";
import StandartButton from "../components/UI/button/StandartButton";
import AddToFavoriteButton from "../components/UI/button/AddToFavoriteButton";
import {favoriteAPI} from "../services/FavoriteService";
import ReviewView from "../components/UI/review/ReviewView";
import ReviewContainer from "../components/UI/review/ReviewContainer";
import PostReview from "../components/UI/review/PostReview";
import AuthorizedComponent from "../components/AuthorizedComponent";
import OrderComponent from "../components/UI/order/OrderComponent";
import {Rating} from "react-simple-star-rating";


const LaptopPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {accessToken} = useAppSelector(state => state.tokenReducer);
    const [isFavorite, setIsFavorite] = useState(false);
    let id = 0;
    if(params.id){
       id = parseInt(params.id);
    }
    const {data: laptop} = laptopAPI.useFetchLaptopByIdQuery(id);
    const {data: brand} = brandAPI.useFetchBrandByIdQuery(id);
    const {data: favorites} = favoriteAPI.useFetchFavoritesQuery(null);
    const [addFavorite, {}] = favoriteAPI.useAddFavoriteMutation();
    const [deleteFavorite, {}] = favoriteAPI.useDeleteFavoriteMutation();

    useEffect(() => {

    }, [laptop])

    useEffect(() => {
        if(favorites) {
            for (let i = 0; i < favorites.length; i++) {
                if(favorites[i].laptop.id === id){
                    setIsFavorite(true);
                }
            }
        }

    }, [favorites])

    const getGuarantee = (guarantee: number) => {
        return guarantee === 0 ? "нет" : guarantee + " месяцев";
    }

    let model = "";
    if(laptop){
        model = getModel(laptop);
    }else {
        return (
            <NotFoundPage/>
        )
    }

    const changeFavorite = (e: any) => {
        e.preventDefault();

        if(isFavorite){
            if(favorites) {
                for (let i = 0; i < favorites.length; i++) {
                    if(favorites[i].laptop.id === id){
                        deleteFavorite(favorites[i].id);
                    }
                }
            }
        }else {
            addFavorite({laptopId: laptop.id} as IFavoriteRequest);
        }
        setIsFavorite(!isFavorite);
    }


    return (
        <div className="px-3 mx-auto">
            <div className="my-3"><Link to="/">back to laptops</Link></div>
            <div className="flex mt-10">
                <div className="w-9/12">
                    <div className="font-semibold text-xl">
                        {model}
                    </div>
                    <div className="flex mt-3">
                        <div className="w-5/12 pb-3 pe-3">
                            <div className="relative">
                                <img
                                    src={laptop.imageUrl ? laptop.imageUrl : imageNotFound}
                                    alt="img-blur-shadow"
                                    className="h-full w-full"
                                />
                                <div className="absolute top-1 right-1">
                                    <AuthorizedComponent>
                                        <AddToFavoriteButton onClick={changeFavorite} favorite={isFavorite}/>
                                    </AuthorizedComponent>

                                </div>
                            </div>

                        </div>
                        <div className="w-full ps-3 text-lg">
                            <div className="flex">
                                <div className="p-2 pe-10">
                                    {laptop.name}
                                </div>
                                <div>
                                    <Rating size={25}
                                            readonly
                                            initialValue={laptop.averageScore}
                                            iconsCount={5}
                                            allowFraction
                                            showTooltip
                                            tooltipStyle={{marginLeft: "", background: "inherit", color: "black", padding: "5px 15px 1px 10px"}}

                                             />
                                </div>
                            </div>
                            <div className="flex py-4">
                                {/*<div className="line-through">*/}
                                {/*    {laptop.price}*/}
                                {/*</div>*/}
                                <div className="text-5xl">
                                    {laptop.price} сом
                                </div>
                            </div>

                            <div>
                                <div className="text-2xl pb-3"> Дополнительная информация о ноутбуке:</div>

                                <table className="table-auto">
                                    <tbody>
                                    <tr>
                                        <td className="font-semibold">
                                            Бренд
                                        </td>
                                        <td className="ps-3">
                                            {brand && brand.name}
                                        </td>

                                    </tr>
                                    <tr>
                                        <td className="font-semibold">
                                            Количество на складе
                                        </td>
                                        <td className="ps-3">
                                            {laptop.amount}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">
                                            Категория
                                        </td>
                                        <td className="ps-3">
                                            {laptop.category}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">
                                            Гарантия
                                        </td>
                                        <td className="ps-3">
                                            {getGuarantee(laptop.guarantee)}
                                        </td>
                                    </tr>
                                     {/*todo: add average score*/}
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <div className="text-2xl"> Описание ноутбука:</div>
                                <div>
                                    {laptop.description}
                                </div>
                            </div>




                        </div>
                    </div>

                    <div className="w-11/12 py-3">
                        <div className="text-2xl pb-2">
                            Характеристики ноутбука:
                        </div>
                        <HardwareTable laptop={laptop}/>
                    </div>
                    {/*todo: make rating looking*/}

                </div>
                <div className="w-3/12 bg-amber-200 p-2">

                    <OrderComponent laptop={laptop}/>

                </div>

            </div>

            <div className="pt-5">
                <ReviewContainer laptopId={laptop.id}/>
            </div>



        </div>
    );
};

interface HardwareTableProps {
    laptop: ILaptop;
}

const HardwareTable:FC<HardwareTableProps> = ({laptop}) => {
    return (
        <table className="table-auto border-b border-slate-900 text-xl w-full border-black">
            <thead className="border-b border-black">
                <tr >
                </tr>
            </thead>
            <tbody className="border-b">
            {
                laptop.hardwareList.map(hardware =>
                    <tr key={hardware.id}>
                        <td className="ps-3 py-2 font-semibold border-b border-black">
                            {hardware.hardwareType}
                        </td>
                        <td className="py-2 border-b border-black">
                            {hardware.name}
                        </td>
                    </tr>)
            }


            </tbody>
        </table>
    )
}

export default LaptopPage;
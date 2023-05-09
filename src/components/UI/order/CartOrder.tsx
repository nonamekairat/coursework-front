import React, {FC, useEffect, useState} from 'react';
import Counter from "../counter/Counter";
import {Button, ThemeProvider} from "@material-tailwind/react";
import {ILaptop} from "../../../models/ILaptop";
import MySelect from "../select/MySelect";
import {typesAPI} from "../../../services/TypesService";
import {types} from "../../../util/Constants";
import value = ThemeProvider.propTypes.value;
import {IOption} from "../../../models/form/IOption";
import ShopLocation from "../location/Location";
import UserLocation from "../location/UserLocation";
import {userAPI} from "../../../services/UserService";
import {orderAPI} from "../../../services/OrderService";
import {useAppDispatch} from "../../../hooks/redux";
import {cartSlice} from "../../../store/reducers/CartSlice";

interface CartOrderProps {
    laptops: ILaptop[];
}

const CartOrder:FC<CartOrderProps> = ({laptops}) => {

    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentType, setPaymentType] = useState("");
    const [deliveryType, setDeliveryType] = useState("");
    const dispatch = useAppDispatch();
    // const [address, setAddress] = useState("");
    const {data: user} = userAPI.useFetchUserQuery(null);
    const {data: paymentTypes} = typesAPI.useFetchTypesQuery(types.paymentType);
    const {data: deliveryTypes} = typesAPI.useFetchTypesQuery(types.deliveryType);
    const [orderLaptops, {}] = orderAPI.useMakeOrderMutation();

    useEffect(() => {
        setTotalPrice(getTotalPrice(laptops));
    }, [])

    useEffect(() => {
        // if(user)
        // setAddress(user.address)
    }, [user])




    const getTotalPrice = (laptops: ILaptop[]) => {
        let totalPrice = 0;
        for (let i = 0; i < laptops.length; i++) {
            totalPrice += laptops[i].price;
        }
        return totalPrice;
    }
    const onPaymentTypeChange = (e: any) => {
        setPaymentType(e);
    }
    const onDeliveryTypeChange = (e: any) => {
        setDeliveryType(e);
    }

    const orderHandle = () => {
        if(deliveryType !== "" && paymentType !== ""){//todo: message if delivery type or payment type was not chosen
            orderLaptops({
                deliveryType,
                paymentType,
                laptops: laptops.map(laptop => laptop.id),
            })
            dispatch(cartSlice.actions.clearCart());
        }

    }


    return (
        <div className="flex">
            <div className="w-6/12">
                {deliveryType === 'Самовывоз' ? <ShopLocation />
                    :
                    deliveryType === 'С доставкой' ?
                        <UserLocation address={user?.address}/>
                        :
                        <div></div>

                }
            </div>
            <div className="border-4 rounded-3xl h-96 w-6/12">
                <div className="p-6">
                    <div className="text-2xl mb-8 flex justify-between">
                        <div className="font-semibold">
                            Общая сумма:
                        </div>
                        {totalPrice} сом
                    </div>

                    <div className="text-2xl mb-8 flex justify-between">
                        <div className="font-semibold">
                            Общее количество:
                        </div>
                        {laptops.length} {laptopsCount(laptops.length)}
                    </div>

                    <div className="flex flex-col space-y-3">
                        {paymentTypes &&
                            <MySelect label="Тип оплаты" options={paymentTypes.map(type => {
                                return {value: type, child: type}
                            })} onChange={onPaymentTypeChange} //todo: при выборе карты должна вылезать форма снизу
                            />
                        }
                        {deliveryTypes &&
                            <MySelect label="Тип заказа" options={deliveryTypes.map(type => {
                                return {value: type, child: type}
                            })} onChange={onDeliveryTypeChange}
                            />
                        }
                        <Button color="amber" className="rounded-3xl" onClick={orderHandle}>заказать</Button>
                    </div>
                </div>
            </div>
        </div>

    );
};

const laptopsCount = (length: number) => {
    if(length === 1) return "ноутбук"
    if(length >= 2 && length <= 4) return "ноутбука"
    return "ноутбуков"
}

export default CartOrder;
import React from 'react';

import address from "../../assets/address-1.png";

const ShopLocation = () => {
    return (
        <div className="p-5">
            <div className="pb-3">
                <div>
                    Адресс по которому вы можете забрать ваш заказ:
                </div>

                <div className="underline">
                    178-170 просп. Чуй, Бишкек
                </div>
            </div>

            <img src={address}
                 alt="not found"
                 className="
                 mx-auto
                 shadow max-w-full h-auto align-middle border-none"/>
            <div className="text-sm">*Адрес на карте</div>
        </div>
    );
};

export default ShopLocation;
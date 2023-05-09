import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ILaptop} from "../../models/ILaptop";
import {stat} from "fs";

interface ICart {
    laptops: ILaptop[];
    total: number;
}
const initialState: ICart = {
    laptops: [],
    total: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart(state, action: PayloadAction<ILaptop>) {
            state.laptops.push(action.payload);
            state.total = state.total + 1;
        },
        removeFromCart(state, action: PayloadAction<ILaptop>) {
            const newLaptops = state.laptops;
            for (let i = 0; i < newLaptops.length; i++) {
                if(newLaptops[i].id === action.payload.id){
                    newLaptops.splice(i, 1);
                    state.total = state.total - 1;
                }
            }
            state.laptops = newLaptops;
        },
    },
})

export default cartSlice.reducer;


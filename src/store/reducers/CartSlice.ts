import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ILaptop} from "../../models/ILaptop";

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
            const index = state.laptops.indexOf(action.payload);
            if (index > -1) {
                state.laptops.splice(index, 1);
            }
            state.total = state.total - 1;
        },

    },
})

export default cartSlice.reducer;


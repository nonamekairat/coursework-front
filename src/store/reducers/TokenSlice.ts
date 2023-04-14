import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IToken} from "../../models/IToken";

interface TokenState {
    token: string | null;
}

const initialState: TokenState = {
    token: null
}
// todo: store token in localStorage or somewhere else

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {

        tokenSet(state, action: PayloadAction<IToken>) {
            state.token = action.payload.token;
        },
        tokenRemove(state) {
            state.token = null;
        },

    },
})

export default tokenSlice.reducer;
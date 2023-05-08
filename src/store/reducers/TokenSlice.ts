import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IToken} from "../../models/IToken";



const initialState: IToken = {
    accessToken: "",
    refreshToken: ""
}
// todo: store token in localStorage or somewhere else

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {

        tokenSet(state, action: PayloadAction<IToken>) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        tokenRemove(state) {
            state.accessToken = "";
            state.refreshToken = "";
        },

    },
})

export default tokenSlice.reducer;
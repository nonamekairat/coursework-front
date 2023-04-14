import {AppDispatch} from "../store";
import axios from "axios";
import {IUser} from "../../models/user/IUser";
import {userSlice} from "./UserSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";


// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(userSlice.actions.usersFetching())
//         const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
//         dispatch(userSlice.actions.usersFetchingSuccess(response.data))
//     } catch (e) {
//         let errorMessage = "Failed to do something exceptional";
//         if (e instanceof Error) { // todo: find better way of handling this
//             errorMessage = e.message;
//         }
//         dispatch(userSlice.actions.usersFetchingError(errorMessage))
//     }
// }

export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)

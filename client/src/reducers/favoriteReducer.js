import { createSlice } from "@reduxjs/toolkit";
import { addFavorite, deleteFav, getFavorite } from "../actions/favoriteAction";

const initialState = {
    loading: false,
    message: "",
    error: "",
    data: [],
    deleteData: {}
}
const favoriteSlice = createSlice({
    name: "favorite",
    initialState: initialState,
    reducers: {
        removeMessage: (state,action)=>{
            state.message = "";
        },
        removeError: (state,action)=>{
            state.error = "";
        }
    },
    extraReducers: {
        [addFavorite.fulfilled]: (state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        [addFavorite.pending]: (state,action)=>{
            state.loading = true;
        },
        [getFavorite.fulfilled]: (state,action)=>{
            state.loading = false;
            state.data = action.payload.data
        },
        [getFavorite.pending]: (state,action)=>{
            state.loading = true;
        },
        [deleteFav.fulfilled]: (state,action)=>{
            state.loading = false;
            state.deleteData = action.payload.data
            state.data = state.data.filter((item)=> item.movieId !== action.payload.data.movieId)
        },
        [deleteFav.pending]: (state,action)=>{
            state.loading = true;
        }
    }
});

export const favoriteActions = favoriteSlice.actions;
export default favoriteSlice.reducer;
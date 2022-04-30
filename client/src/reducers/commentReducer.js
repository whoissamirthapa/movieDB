import { createSlice } from "@reduxjs/toolkit";
import { addComment, deleteComment, getComment } from "../actions/commentActions";


const initialState = {
    loading: false,
    message: "",
    error: "",
    data: [],
    deleteData: {}
}

const commentSlice = createSlice({
    name: "comment",
    initialState: initialState,
    reducers: {
        removeMessage: (state,action)=>{
            state.message = "";
        }
    },
    extraReducers: {
        [addComment.fulfilled]: (state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.data = [ ...state.data, action.payload.comment];
        },
        [addComment.pending]: (state,action)=>{
            state.loading = true
        },
        [getComment.fulfilled]: (state,action)=>{
            state.loading = false;
            if(action.payload.data){
                state.data = [...action.payload.data];
            }
        },
        [getComment.pending]: (state,action)=>{
            state.loading = true
        },
        [deleteComment.fulfilled]: (state,action)=>{
            state.loading = false;
            state.data = state.data.filter(item=> item._id !== action.payload.data._id);
        },
        [deleteComment.pending]: (state,action)=>{
            state.loading = true
        }
    }
})

export const commentActions = commentSlice.actions;
export default commentSlice.reducer;
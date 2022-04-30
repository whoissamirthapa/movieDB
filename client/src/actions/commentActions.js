import { createAsyncThunk } from "@reduxjs/toolkit";


export const addComment = createAsyncThunk(
    "addcommentaction",
    async(data)=>{
        const res = await fetch(`/api/comment/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("userToken")}`
            },
            body: JSON.stringify(data)
        })

        return await res.json();
    }
)

export const getComment = createAsyncThunk(
    "getCommentaction",
    async(id)=>{
        const res = await fetch(`/api/comment/${id}/all-comments`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("userToken")}`
            }
        })

        return await res.json();
    }
)
export const deleteComment = createAsyncThunk(
    "deleteCommentaction",
    async(data)=>{
        const res = await fetch(`/api/comment/${data.movieId}/delete/${data.commentId}`,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("userToken")}`
            }
        })

        return await res.json();
    }
)
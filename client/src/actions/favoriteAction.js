import { createAsyncThunk } from "@reduxjs/toolkit";


export const addFavorite = createAsyncThunk(
    "addingfavoriteaction",
    async(data)=>{
        const res = await fetch('/api/favorite-movie/add', {
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

export const getFavorite = createAsyncThunk(
    "gettingfavoriteaction",
    async()=>{
        const res = await fetch("/api/favorite-movie/all-favorite", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("userToken")}`
            }
        })

        return await res.json();
    }
)

export const deleteFav = createAsyncThunk(
    "deleteFavoriteaction",
    async(id)=>{
        const res = await fetch(`/api/favorite-movie/delete/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("userToken")}`
            }
        })

        return await res.json();
    }
)
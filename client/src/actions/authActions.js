import { createAsyncThunk } from "@reduxjs/toolkit";


export const registerUser = createAsyncThunk(
    "registeraction",
    async(data)=>{
        const res = await fetch('/api/users/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const resData = await res.json();
        return resData;
    }
)

export const loginUser = createAsyncThunk(
    "loginaction",
    async(data)=>{
        console.log(data);
        const res = await fetch('/api/users/login',{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return await res.json();
    }
)
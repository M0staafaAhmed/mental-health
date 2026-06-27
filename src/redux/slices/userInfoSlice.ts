import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface UserInfoState {
    token: string;
    user: {
        id: number;
        name: string;
    };
    stats: {
        totalTests: number | null;
        lastScore: number | null;
    }
}


const initialState = (): UserInfoState => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        return JSON.parse(userInfo);
    } else {
        return {
            token: '',
            user: {
                id: 0,
                name: ''
            },
            stats: {
                totalTests: 0 ,
                lastScore: null
            }
        };
    }
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.stats = action.payload.stats;
            localStorage.setItem('userInfo', JSON.stringify(state));
        },
        clearUserInfo: (state) => {
            state.token = '';
            state.user = { id: 0, name: '' };
            state.stats = { totalTests: 0, lastScore: null };
            localStorage.removeItem('userInfo');
            toast.success("Logged out successfully!");
        },
        test: (state) => {
            console.log("Current User Info:", state);
        }
    },
})

export const { setUserInfo, clearUserInfo, test } = userInfoSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;

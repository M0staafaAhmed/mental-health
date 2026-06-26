import { createSlice } from "@reduxjs/toolkit";

export interface UserInfoState {
    token: string;
    user: {
        id: number;
        name: string;
    };
}


const initialState = () : UserInfoState => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        return JSON.parse(userInfo);
    } else {
        return {
            token: '',
            user: {
                id: 0,
                name: ''
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
            localStorage.setItem('userInfo', JSON.stringify(state));
        },
        clearUserInfo: (state) => {
            state.token = '';
            state.user = { id: 0, name: '' };
            localStorage.removeItem('userInfo');
        },
        test: (state) => {
            console.log("Current User Info:", state);
        }
    },
})

export const { setUserInfo, clearUserInfo, test } = userInfoSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;

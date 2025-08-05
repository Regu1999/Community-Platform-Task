import { createSlice } from "@reduxjs/toolkit";
import { autoLogin } from "../http.js";
import { createNotification } from "./notification"
const tokenSlice = createSlice({
    name: 'token',
    initialState: null,
    reducers: {
        addToken: (state, action) => {
            return action.payload;
        },
        emptyToken: (state) => {
            return null;
        }
    }
})

export const { addToken, emptyToken } = tokenSlice.actions

export const autoLoginAction = () => {
    return async dispatch => {
        try {
            const data = await autoLogin();
            dispatch(addToken(data?.token || null))
        } catch (error) {
            dispatch(createNotification({ status: "error", message: error.message || "Please login" }))
        }

    }
}

export default tokenSlice.reducer
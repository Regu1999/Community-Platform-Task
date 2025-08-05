import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        status: null,
        message: null,
        info: null
    },
    reducers: {
        createNotification(state, action) {
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.info = action.payload.info;
        },
        removeNotification(state) {
            state.status = null;
            state.message = null;
            state.info = null;
        }
    }
})

export const { createNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer
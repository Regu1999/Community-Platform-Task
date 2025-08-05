import { configureStore } from "@reduxjs/toolkit"

import token from "./token"
import notification from "./notification"

const store = configureStore({
    reducer: {
        token,
        notification
    }
})

export default store;
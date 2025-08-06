import { useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react"
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from 'react-router'

import NavBar from "../component/Navbar"
import Notification from "../component/UI/Notification"
import { removeNotification } from '../store/notification'

export default function RootLayout() {
    const dispatch = useDispatch()
    const timerRef = useRef();
    const notificationStatus = useSelector(state => state.notification.status);
    const notificationMessage = useSelector(state => state.notification.message);
    
    useEffect(() => {
        if (notificationStatus && notificationMessage) {
            timerRef.current = setTimeout(() => {
                dispatch(removeNotification())
            }, 5000)
        }
        return () => {
            clearTimeout(timerRef.current)
        }

    }, [notificationStatus, notificationMessage])

    return <>
        <AnimatePresence>
            {(notificationMessage || notificationStatus) && <Notification />}
        </AnimatePresence>

        <NavBar />
        <main>
            <Outlet />
        </main>
    </>
}

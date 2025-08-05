import { useDispatch } from "react-redux"

import { createNotification } from '../store/notification'

export default function useNotification() {
    const dispatch = useDispatch();

    const notification = (data) => {
        dispatch(createNotification(data));
    }
    return notification;
}
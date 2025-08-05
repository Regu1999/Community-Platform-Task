import { motion } from "motion/react"
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";

import { removeNotification } from '../../store/notification'

const Notification = () => {
    const dispatch = useDispatch()
    let style;
    const errorStyles = "bg-red-100 border-red-400 text-red-700";
    const infoStyles = "bg-blue-100 border-blue-500 text-blue-700";
    const successStyles = "bg-green-100 border-green-500 text-green-700";
    const notificationStatus = useSelector(state => state.notification.status);
    const notificationMessage = useSelector(state => state.notification.message);
    const notificationInfo = useSelector(state => state.notification.info);

    if (notificationStatus == "error") {
        style = errorStyles
    }
    if (notificationStatus == "info") {
        style = infoStyles;
    }
    if (notificationStatus == "success") {
        style = successStyles
    }
    return <motion.div
        variants={{
            hidden: { y: -10, opacity: 0 },
            show: { y: 0, opacity: 1 }
        }}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="w-full fixed z-50 flex justify-center items-center">
        <motion.div
            whileHover={{
                scale: 1.01
            }}
            className={`max-w-96 my-5 mx-3 w-full rounded-lg p-3 flex justify-between gap-3 border ${style}`}>
            <div>
                <p className="">{notificationMessage} </p>
                {notificationInfo && <ul>
                    {notificationInfo.map((data) => {
                        return <li key={data.msg}>{data.msg}</li>
                    })}
                </ul>}
            </div>
            <motion.button
                whileTap={{ scale: 0.7 }}
                onClick={() => dispatch(removeNotification())}
                className="text-2xl hover:text-white focus:outline-none"><IoClose /></motion.button>
        </motion.div>
    </motion.div>
}
export default Notification
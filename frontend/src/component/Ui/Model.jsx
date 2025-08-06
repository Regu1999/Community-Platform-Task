import { useEffect, useRef } from "react"
import { motion } from "motion/react"

export default function Modal({ children, close }) {
    const dialog = useRef()
    useEffect(() => {
        const modal = dialog.current
        modal.showModal();
        // return () => {
        //     modal.close()
        // }

    }, [])
    return <motion.dialog
        variants={{
            open: {
                opacity: 1,
                y: 0
            },
            close: {
                opacity: 0,
                y: 20
            }
        }}
        initial="close"
        animate="open"
        exit="close"
        ref={dialog} className="outline-none rounded-lg bg-white fixed mx-auto my-auto" onClose={close} >
        {children}
    </motion.dialog>
}
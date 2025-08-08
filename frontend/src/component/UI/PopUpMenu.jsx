import { motion, AnimatePresence } from "motion/react"
import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
const PopUpMenu = ({ options }) => {
    const [isOpen, setIsopen] = useState(false)
    const popUpref = useRef()

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClosePopup)

        }
        return () => {
            document.removeEventListener('mousedown', handleClosePopup)
        }
    }, [isOpen])

    function handleClosePopup(event) {
        if (popUpref.current && !popUpref.current.contains(event.target)) {
            setIsopen(false)
        }
    }
    return <div className="relative" ref={popUpref}>
        <motion.button
            onClick={() => {
                setIsopen(!isOpen)
            }}
            whileTap={{
                scale: .9
            }}
            className="hover:bg-gray-200 rounded-lg p-1 cursor-pointer"><BsThreeDots className="text-2xl " /></motion.button>
        <AnimatePresence> {isOpen && <motion.ul
            variants={{
                hidden: {
                    opacity: 0,
                    height: 0,
                    width: 0
                },
                open: {
                    height: 'auto',
                    width: 'auto',
                    opacity: 1,
                }
            }}
            initial="hidden"
            animate="open"
            exit="hidden"
            transition={{ duration: 0.1 }}
            className="border border-gray-300 bg-white rounded-sm shadow p-2 min-w-32 absolute top-1 right-9">
            {options.map((option, index) => {
                return <motion.li
                    key={index}
                    whileTap={{
                        scale: .9
                    }}
                > <button
                    className="hover:bg-gray-200 p-2 rounded-sm cursor-pointer w-full text-left"
                    onClick={() => {
                        option.action();
                        setIsopen(false)
                    }}>
                        {option.title}
                    </button>
                </motion.li>
            })}
        </motion.ul>}</AnimatePresence>
    </div>

}
export default PopUpMenu
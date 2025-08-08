import { motion } from "motion/react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Spiner = ({ textColor = "text-blue-500" }) => {
    return <motion.div
        animate={{ rotate: 360 }}
        transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 1,
        }}
        style={{
            display: "inline-block",
            transformOrigin: "center",
        }}
    ><AiOutlineLoading3Quarters className={`text-2xl ${textColor}`} />
    </motion.div>
}
export default Spiner;
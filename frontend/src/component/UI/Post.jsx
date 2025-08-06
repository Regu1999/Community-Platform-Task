import { BiLike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { CgComment } from "react-icons/cg";
import { useMediaQuery } from 'react-responsive'
import { motion } from "motion/react"

import profile from "../../assets/dummy-profile-oic.jpg"
import { timeAgo } from '../../util/timeConverter.js'

const Post = ({ name, text, createdAt, followBtn = true }) => {
    const time = timeAgo(createdAt);
    const isMediumDevice = useMediaQuery({ query: '(min-width: 48rem)' })


    return <div className="rounded-xl border-2 border-gray-200 bg-white p-4">
        <div className="flex justify-between items-center">
            <div className="flex gap-2 ">
                <img src={profile} alt={name} className="w-12 h-12 rounded-full" />
                <div>
                    <p className="font-semibold">{name}</p>
                    <small className="text-gray-400">{time}</small>
                </div>
            </div>
            {followBtn ? <div>
                <motion.button
                    whileTap={{ scale: .9 }}
                    className="bg-blue-500 p-1 px-3 rounded-xl text-white cursor-pointer">follow</motion.button>
            </div>:''}
        </div>
        <p className="text-lg mt-3 whitespace-pre-wrap break-words">
            {text}
        </p>
        <div className="flex gap-2 justify-center">
            <button className="w-full text-lg hover:text-blue-500 cursor-pointer p-2"><BiLike className="inline-block text-2xl" /> {isMediumDevice && "Like"}</button>
            <button className="w-full text-lg hover:text-blue-500 cursor-pointer p-2"><CgComment className="inline-block text-2xl" /> {isMediumDevice && "Comment"}</button>
            <button className="w-full text-lg hover:text-blue-500 cursor-pointer p-2"><RiShareForwardLine className="inline-block text-2xl" /> {isMediumDevice && "Share"}</button>
        </div>
    </div>
}

export default Post
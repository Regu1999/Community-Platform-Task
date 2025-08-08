import { useState } from "react";
import { BiLike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { CgComment } from "react-icons/cg";
import { useMediaQuery } from 'react-responsive'
import { motion, AnimatePresence } from "motion/react"
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

import profile from "../../assets/dummy-profile-oic.jpg"
import { timeAgo } from '../../util/timeConverter.js'
import PopUpMenu from "./PopUpMenu.jsx";
import CreatePost from "../CreatePost.jsx";
import {deletePost, queryClient } from "../../http.js"
import useNotification from "../../hooks/useNotification.js";
import Spiner from "./Spiner.jsx";

const Post = ({ name, text, createdAt, followBtn = true, id }) => {
    const token = useSelector(state => state.token)
    const [isopen, setIsOpen] = useState(false)
    const notification = useNotification()
    const {isError: isDeleteError, error: deleteError, mutate: deleteMutate, isPending: deletePending } = useMutation({
        mutationFn: () => deletePost(token, id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["myPosts"] })
            notification({ message: data.message, status: "success" })
        }
    })
    if (isDeleteError) {
        notification({ message: deleteError.message, status: "error" })

    }
    const time = timeAgo(createdAt);
    const isMediumDevice = useMediaQuery({ query: '(min-width: 48rem)' })
    let popUpMenuOptions;
    if (!followBtn) {
        popUpMenuOptions = [
            {
                title: "Edit", action: () => {
                    console.log("Editing...");
                    setIsOpen(true)
                }
            },
            {
                title: "Delete", action: () => {
                    deleteMutate()
                }
            }
        ]
    }
    function closePost() {
        setIsOpen(false)
    }

    return <>
        {!followBtn && <AnimatePresence>
            {isopen && <CreatePost closePopup={closePost} defaultValue={text} id={id} />}
        </AnimatePresence>}

        <div className="rounded-xl border-2 border-gray-200 bg-white p-4">
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

                </div> : deletePending ? <Spiner /> : <PopUpMenu options={popUpMenuOptions} />}
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
    </>
}

export default Post
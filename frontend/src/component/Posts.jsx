import { useMediaQuery } from 'react-responsive'
import { motion } from "motion/react"
import { IoMdHome } from "react-icons/io"
import { Link } from 'react-router'
import { FaRegSquarePlus } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'motion/react';

import Post from './UI/Post'
import profile from "../assets/dummy-profile-oic.jpg"
import { getPost } from "../http"
import { createNotification } from "../store/notification"
import Loader from "./UI/Loader";
import CreatePost from './CreatePost';
import { useState } from 'react';

const Posts = () => {
    const [isopen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
    const isMediumDevice = useMediaQuery({ query: '(min-width: 48rem)' })

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: () => getPost(token)
    })
    if (isError) {
        dispatch(createNotification({ message: error.message, status: 'error' }))
    }
    function createPost() {
        setIsOpen(true)
    }
    function closePost() {
        setIsOpen(false)
    }
    
    return <>
        <AnimatePresence>
            {isopen && <CreatePost closePopup={closePost} />}
        </AnimatePresence>
        <section className='bg-[#fefaf1] min-h-[calc(100vh-96px)] flex flex-col items-center gap-5 p-1 md:p-3'>
            {isMediumDevice && <div className='rounded-xl border-2 border-gray-200 bg-white p-5 max-w-[50rem] w-full flex gap-3'>
                <img src={profile} alt={name} className="w-12 h-12 rounded-full" />
                <button onClick={createPost} className='rounded-full border hover:bg-gray-200 border-gray-400 p-2 px-4 w-full text-start cursor-pointer'>Start a Post</button>

            </div>}
            {isLoading ? <Loader /> : <div className='max-w-[50rem] w-full flex flex-col gap-3 mb-15'>
                {
                    !isError && data.length == 0 ? <h1 className='text-center'>No post created yet!</h1> : data.map(post => {
                        return <Post key={post._id} name={post.userId.name} text={post.text} createdAt={post.createdAt} />
                    })
                }

            </div>}
            {!isMediumDevice && <footer className='flex w-full fixed bottom-0 bg-white'>
                <motion.div whileTap={{ scale: 0.9 }} className='w-full border-t border-gray-200 pt-2'>
                    <Link to='/' className="flex flex-col items-center hover:text-[#0a66c2]">
                        <IoMdHome className="text-2xl" />
                        Home
                    </Link>
                </motion.div>
                <motion.button onClick={createPost} whileTap={{ scale: 0.9 }} className='w-full flex flex-col items-center border-t border-gray-200 pt-2 hover:text-[#0a66c2]'>
                    <FaRegSquarePlus className="text-2xl" />
                    Post
                </motion.button>
            </footer>}
        </section>
    </>
}

export default Posts
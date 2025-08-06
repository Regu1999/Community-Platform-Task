import { useQuery, useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { useNavigate } from "react-router";

import profile from '../assets/dummy-profile-oic.jpg'
import Loader from "../component/UI/Loader";
import { createNotification } from "../store/notification";
import Post from "../component/UI/Post";
import { getMyPost, logout } from '../http'
import useNotification from "../hooks/useNotification";
import { emptyToken } from "../store/token";

const Profile = () => {
    const navigate = useNavigate()
    const notification = useNotification();
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    const { data, isError, error, isLoading } = useQuery({
        queryKey: ["myPosts"],
        queryFn: () => getMyPost(token)
    })
    if (isError) {
        navigate('/')
        dispatch(createNotification({ message: error.message, status: 'error' }))
    }

    const { mutate, isError: isMutateError, error: mutateError } = useMutation({
        mutationFn: () => logout(token),
        onSuccess: (dataVal) => {
            notification({ message: dataVal.message + "!", status: "success" })
            dispatch(emptyToken())
            navigate('/')
        }
    })
    useEffect(() => {
        if (isMutateError) {
            notification({ message: mutateError.message + "!", status: "error" });
        }
    }, [isMutateError, mutateError]);

    return <div className="bg-[#fefaf1] min-h-[calc(100vh-96px)] flex justify-center p-1 md:p-3">
        <div className="max-w-[50rem] w-full border border-gray-200 bg-white rounded-xl overflow-hidden bg-contain bg-no-repeat">
            <img src="/assets/dummy-baner.jpg" className='w-full' alt="" />
            <div className='px-2 md:px-8'>
                <div className="flex justify-between items-center">
                    <img src={profile} alt="profile" className='w-20 h-20 rounded-full' />
                    <div>
                        <button onClick={() => mutate()}  className="bg-blue-500 p-2 px-3 rounded-full text-white font-semibold cursor-pointer">Logout</button>
                    </div>
                </div>
                <h3 className='text-2xl font-semibold'>{data?.user.name}</h3>
                <p className='text-gray-400'>{data?.user.email}</p>
                <h3 className="font-semibold">About</h3>
                <p className='md:max-w-[80%]'>{data?.user.bio}</p>
            </div>
            <div className="px-2 md:px-8 mt-5">
                <h3 className="font-semibold mb-5 text-2xl">My Posts</h3>

                {isLoading ? <Loader /> : <div className='max-w-[50rem] w-full flex flex-col gap-3'>
                    {
                        !isError && data?.posts.length == 0 ? <h1 className='text-center'>No post created yet!</h1> : data.posts.map(post => {
                            return <Post key={post._id} followBtn={false} name={data.user.name} text={post.text} createdAt={post.createdAt} />
                        })
                    }

                </div>}
            </div>
        </div>
    </div>
}
export default Profile
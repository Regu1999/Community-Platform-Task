import { IoClose } from "react-icons/io5";
import { motion } from "motion/react"
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { createPost, queryClient, updatePost } from "../http"
import useNotification from "../hooks/useNotification";
const CreatePost = ({ closePopup, defaultValue = "", id = null }) => {
    const notification = useNotification()
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({
        defaultValues: {
            text: defaultValue,
        }
    });

    const token = useSelector(state => state.token)
    function handleClose() {
        closePopup()
    }
    async function onsubmit(formData) {
        try {
            console.log(formData);
            if (id) {
                const response =await updatePost(token, formData);
                notification({ message: response.message + " !", status: 'success' })
                queryClient.invalidateQueries({ queryKey: ["myPosts"] });
            } else {
                const response = await createPost(token, formData)
                notification({ message: response.message + " !", status: 'success' })
                queryClient.invalidateQueries({ queryKey: ["posts"] });

            }
            closePopup();
        } catch (error) {
            notification({ message: error.message, status: 'error' })
        }
    }

    return <motion.div
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1
        }}
        className="fixed left-0 top-0 z-10 overflow-auto bg-[rgba(0,0,0,0.5)] w-full h-full flex justify-center items-center">
        <motion.div
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
            className="max-w-[30rem] w-full min-h-96 max-h-[90vh] mx-5 my-5 p-8 relative bg-white rounded-lg overflow-y-auto">
            <button
                className="outline-none absolute top-2 right-2 cursor-pointer"
                onClick={handleClose}
            >
                <IoClose className="text-2xl hover:text-blue-500" />
            </button>
            <form className="text-right" onSubmit={handleSubmit(onsubmit)}>
                <textarea  {...register("text", {
                    required: 'Message is required',
                    minLength: {
                        value: 15,
                        message: "Minumum 15 letters required"
                    },
                })}
                    className={`focus:outline-0 text-2xl w-full min-h-[250px] ${errors["text"] && 'text-red-500'}`}
                    id="text" placeholder="What you want to talk about?"></textarea>
                <div className="text-left">
                    {errors["text"] && <small className="text-red-500 text-left">{errors["text"].message}</small>}
                </div>
                {id && <input type="hidden" defaultValue={id} {...register("postId")} />}
                <div className="text-left">
                    {errors["postId"] && <small className="text-red-500 text-left">{errors["postId"].message}</small>}
                </div>
                <button type="submit" className="bg-blue-500 rounded-full inline-block text-white p-1 px-3 cursor-pointer">{isSubmitting ? 'Posting..' : 'Post'}</button>
            </form>


        </motion.div>
    </motion.div>

}

export default CreatePost
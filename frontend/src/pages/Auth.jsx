import { Link, useSearchParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import FormBackground from "../component/UI/FormBackground.jsx";
import { authendication } from '../http.js'
import { TextFeild, EmailFeild, PasswordFeild } from "../component/UI/Inputs.jsx";
import { addToken } from "../store/token.js";
import Card from "../component/UI/Card.jsx";
import useNotification from "../hooks/useNotification.js";

const Auth = () => {
    const [search] = useSearchParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const notification = useNotification()
    const loginMode = search.get('mode') === 'login';
    const { register, formState: { errors, isSubmitting }, handleSubmit, watch, reset } = useForm();
    const handleFromSubmit = async (data) => {
        delete data.newPwd;
        try {
            const response = await authendication(search.get('mode'), data);
            notification({ message: "Welcome " + response.name + " !", status: 'success' })
            dispatch(addToken(response.token))
            navigate('/')
        } catch (error) {
            notification({ message: error.message, status: 'error', info: error.info })
        }
    }
     let newPwd;
    if (!loginMode) {
        newPwd = watch("newPwd")
    }
    return <FormBackground>
        <Card>
            <h1 className="text-2xl my-6 font-bold">{loginMode ? "Login" : "Sign Up"}</h1>
            <form action="post" onSubmit={handleSubmit(handleFromSubmit)}>
                {!loginMode && <TextFeild inputId="name" lableName="User Name" placeholder="Name" register={register} errors={errors} />}
                <EmailFeild register={register} errors={errors} />
                {!loginMode && <div className="w-full mb-4">
                    <label htmlFor="newPwd" className="font-semibold mb-1 block">New Password</label>
                    <input type="password" placeholder="create your new password" id="newPwd"
                        className="rounded-md w-full p-2 border border-gray-400 focus:outline-blue-200"
                        {...register("newPwd", {
                            required: 'new password is required for create account',
                            minLength: {
                                value: 6,
                                message: 'minimum 8 cheracter required'
                            }
                        })}
                    />
                    {errors.newPwd && <small className="text-red-500">{errors.newPwd.message}</small>}
                </div>}
                <PasswordFeild register={register} errors={errors} loginMode={loginMode} newPwd={newPwd} />
                {!loginMode && <TextFeild inputId="bio" lableName="Bio" placeholder="about your self" register={register} errors={errors} />}
                
                <button className="bg-blue-500 p-2 w-full my-3 text-white rounded-md hover:bg-white
                     hover:text-blue-500 border hover:border-blue-500 transition-all" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : loginMode ? 'Login' : 'Create Account'}
                </button>
                <small>
                    {loginMode ? "Don't have an account?" : "Already a user?"}
                    <Link to={`?mode=${loginMode ? 'signup' : 'login'}`} className="text-blue-500" onClick={() => reset()}>
                        {loginMode ? ' Join Now' : ' Login'}
                    </Link>
                </small>
            </form>
        </Card>
    </FormBackground>
}
export default Auth
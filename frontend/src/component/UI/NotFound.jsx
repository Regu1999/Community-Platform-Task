import { FiAlertOctagon } from "react-icons/fi";
import { Link } from "react-router";

const NotFound = () => {

    return <>
        <div className="h-screen flex justify-center items-center flex-col text-center text-red-500 animate-fade-in px-5">
             <div> <FiAlertOctagon className=" text-7xl" /></div>
            <p > <span className="block my-3 font-bold text-2xl">Woops...</span>
                File not found</p>
            <Link to='..' className=" p-2 rounded my-3 bg-red-500 text-white">
                Try Again
            </Link>
        </div>
    </>
}

export default NotFound
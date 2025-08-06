import { SiLinkedin } from "react-icons/si"
import { useMediaQuery } from 'react-responsive'
import { Link } from "react-router"
import { IoMdHome } from "react-icons/io"
import { motion } from 'motion/react'
import { useSelector } from "react-redux"

import linkedInlogo from "../assets/logo/LinkedIn.svg"
import profilePic from "../assets/dummy-profile-oic.jpg"
const NavBar = () => {
    const token = useSelector(state => state.token)

    const isMediumDevice = useMediaQuery({ query: '(min-width: 48rem)' })
    return <nav className="flex items-center justify-between px-8 py-3 md:py-0 flex-wrap shadow">
        <Link to='/'>
            {isMediumDevice ? <img src={linkedInlogo} alt="linked in" className="w-36" />
                : <SiLinkedin className="text-[#0a66c2] text-3xl" />}
        </Link>
        {!token ? <div className="flex md:gap-6">
            <Link to="auth?mode=signup" className="p-1 px-3 md:p-3 focus:outline-0 my-3 md:px-5 rounded-full cursor-pointer hover:bg-gray-100">Join now</Link>
            <Link to="auth?mode=login" className="p-1 px-3 md:p-3 focus:outline-0 my-3 md:px-5 rounded-full cursor-pointer border border-[#0a66c2] text-[#0a66c2] hover:bg-blue-50">Sign In</Link>
        </div> :
            <div className="flex gap-5 items-center">
                <motion.div whileTap={{ scale: 0.9 }} >
                    <Link to='/' className="flex flex-col items-center hover:text-[#0a66c2]"><IoMdHome className="text-3xl mb-0.5" /> <p>Home</p></Link>
                </motion.div>

                <motion.div whileTap={{ scale: 0.9 }} >
                    <Link to={"profile/regu"} className="cursor-pointer flex flex-col items-center hover:text-[#0a66c2]">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img src={profilePic} alt="Regu" className="bg-cover h-full" />
                        </div>
                        <p>me</p>
                    </Link>
                </motion.div>
            </div>}

    </nav >

}

export default NavBar
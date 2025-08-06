import { Link } from "react-router"

const Homebanner = () => {
    return <section className="bg-[#fefaf1] md:bg-[url('/assets/banner.png')] 
    w-full md:bg-size-[auto_40rem] md:bg-position-[right_top_-4rem] md:bg-no-repeat min-h-[calc(100vh-96px)] 
    flex items-center ">
        <div className={"px-5 md:px-10 max-w-[50rem] text-center md:text-left py-8"}>
            <h1 className=" text-[clamp(2rem,3vw,5rem)] mb-5">
                Welcome to your professional community
            </h1>
            <ul className="mb-5">
                <li className="text-[clamp(1.5rem,2vw,2rem)]">Find and connect with colleagues</li>
                <li className="text-[clamp(1.5rem,2vw,2rem)]">Learn the skill you need to succeed</li>
                <li className="text-[clamp(1.5rem,2vw,2rem)]">Build your professional presence</li>
            </ul>
            <div className="flex gap-5 flex-wrap justify-center md:justify-start">
                <Link to="auth?mode=login" className="cursor-pointer shadow-lg font-bold 
            text-white bg-blue-500 p-3 rounded-full px-8">Sign In with you acount</Link>
                <Link to="auth?mode=signup" className="cursor-pointer border border-blue-500 shadow-lg font-bold 
            bg-white text-blue-500 p-3 rounded-full px-8">Join Now</Link>
            </div>
        </div>
    </section>
}

export default Homebanner
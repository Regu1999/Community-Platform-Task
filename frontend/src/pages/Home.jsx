import { useSelector } from "react-redux"

import Homebanner from "../component/HomeBanner"
import Posts from "../component/Posts"

const Home = () => {
    const token = useSelector(state => state.token)
    return <section>
        {token ? <Posts /> : <Homebanner />}
    </section>
}

export default Home
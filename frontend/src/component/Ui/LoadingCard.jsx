import Loader from "./Loader.jsx";
const LoadingCard = ({ loadingCount = 1 }) => {
    const loadingArrays = new Array(loadingCount).fill(0);
    return <div className="flex flex-wrap justify-center animate-fade-in mb-10">
        {loadingArrays.map((loadingArray, index) => {
            return <Loader key={index} />
        })}
    </div>
}
export default LoadingCard
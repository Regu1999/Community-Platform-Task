export default function Card({ children, shadow = true, styleClass }) {
    return <div className={`w-96 min-h-96 h-full mx-5 bg-white p-5 sm:p-14 rounded-md my-5 ${shadow && 'shadow-2xl'} ${styleClass}`}>
        {children}
    </div>
}
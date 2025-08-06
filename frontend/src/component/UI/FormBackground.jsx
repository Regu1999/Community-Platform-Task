export default function FormBackground({ children }) {
    return <div className="flex items-center min-h-[calc(100vh-96px) justify-center h-full bg-gradient-to-t from-white from-50% to-blue-500 to-50%">{children}</div>
}
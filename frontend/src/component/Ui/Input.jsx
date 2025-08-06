export default function Input({ lableName, inputId, type = "text", placeholder, required = true, register, errors, validation }) {
    return <div className="w-full mb-4">
        {lableName && <label htmlFor={inputId} className={`font-semibold mb-1 block ${errors[inputId]&& 'text-red-500'}`}>{lableName}</label>}
        <input type={type} placeholder={placeholder} name={inputId}
            id={inputId}
            className={`rounded-md w-full p-2 border border-gray-400 focus:outline-blue-200 ${errors[inputId]&&'border-red-500 text-red-500'}`}
            {...register(inputId, validation)}
        />
        {errors[inputId]&&<small className="text-red-500">{errors[inputId].message}</small>}
    </div>
}
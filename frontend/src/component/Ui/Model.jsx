import { useEffect, useRef } from "react"

export default function Modal({ children, close }) {
    const dialog = useRef()
    useEffect(() => {
        const modal = dialog.current
        modal.showModal();
        // return () => {
        //     modal.close()
        // }

    }, [])
    return <dialog ref={dialog} className="outline-none" onClose={close} >
        {children}
    </dialog>
}
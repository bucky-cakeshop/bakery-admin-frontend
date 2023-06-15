import ReactDOM from "react-dom";
import { useEffect } from "react";

function Modal({onClose, children, actionBar}){
    useEffect(()=>{
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    },[]);
    return ReactDOM.createPortal(
        <div>
            <div onClick={onClose} className="fixed inset-0 bg-gray-300 opacity-80"></div>
            <div className="mx-auto grid grid-cols-4 fixed inset-40 p-7 bg-white">
                <div className="flex flex-col justify-btween h-full col-span-3 bg-slate-500">
                    {children}
                </div>
                <div className="flex justify-end">
                        {actionBar}
                </div>

            </div>
        </div>,
        document.querySelector('.modal-container')/**Está definido en el index.html */
    );
}
export default Modal;
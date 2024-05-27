import React from 'react';
import { useDispatch } from 'react-redux';
import { closeToast } from '../state/utilSlice';
import { FiXCircle } from "react-icons/fi";
import { BsExclamationCircleFill } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
const Toast = ({ isOpen, message,status }) => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(closeToast());
    };

    const ToastData = status === "Error" ? { color: "red", icon: FiXCircle } : status === "Info" ? { color: "blue", icon: BsExclamationCircleFill } : { color:"green", icon: IoIosCheckmarkCircle}
    setTimeout(() => {
        dispatch(closeToast());
    },5000)
    return isOpen ? (
        <div className={`after:animation-Toast fixed top-14 right-0 -translate-x-1/2 pr-8 rounded-md transition-opacity
        duration-500 shadow-md bg-white after:contents-['*'] after:absolute after:left-0 after:bottom-0 after:bg-${ToastData.color}-400 after:w-full after:h-[6px] after:rounded-md z-30`}>
            <div className="flex justify-between items-center p-3">
                <div className={`w-5 h-5 text-center rounded-full text-white`}>
                    <ToastData.icon size="22px" color={ ToastData.color} />
                </div>
                <div className="flex-grow ml-2 text-sm font-semibold">{message}</div>
                <button onClick={handleClose} className="ml-2 absolute right-2 top-1 text-gray-600 hover:text-gray-800 focus:outline-none">
                    x
                </button>
            </div>
        </div>
    ) : null;
};

export default Toast;

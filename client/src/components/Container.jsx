import React from 'react'
import { useSelector } from 'react-redux'
import Toast from './Toast';

import Loading from './Loading';
function Container({ children }) {
    const { isOpen, message, status } = useSelector(state => state.utilReducer.toast);
    const isLoading= useSelector(state => state.utilReducer.isLoading);
    return (
        <div className='overflow-hidden max-w-[100%] w-full min-h-screen'>
            {isLoading && <Loading />}
            {isOpen && <Toast message= {message} isOpen={isOpen} status={status} />}
            {children}
        </div>
    )
}

export default Container
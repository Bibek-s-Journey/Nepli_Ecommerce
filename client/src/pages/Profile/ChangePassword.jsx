import React from 'react'
import Input from '../../components/Input';
import { useChangePasswordMutation } from '../../state/api';
import { Loading, showToast } from '../../state/utilSlice.js'
import { useDispatch } from 'react-redux';
function ChangePassword() {
    const dispatch = useDispatch();
    const [ChangePassword] = useChangePasswordMutation(); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formdata = new FormData(e.target);
            const reqData = {
                currentPassword: formdata.get("currentPassword"),
                newPassword: formdata.get("newPassword"),
            }
            const res = await ChangePassword(reqData);
            if (res?.data?.success) {
                dispatch(showToast({ message: res.data.message, status: "Success" }))
                window.history.back();
            } else {
                dispatch(showToast({ message: res.error.data.message, status: "Error" }));
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1 className='text-center text-xl font-bold tracking-tight'>Change Password</h1>
            <form onSubmit={handleSubmit}>
                <Input type="password" label="Current Password" className="my-2" name="currentPassword" />
                <Input type="password" label="New Password" className="my-2" name="newPassword" />
                <button type='submit' className='bg-black text-white rounded-md py-1 px-4 mt-3 hover:bg-black/80'>Sumbit</button>
            </form>
        </div>
    )
}

export default ChangePassword
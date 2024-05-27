import React, { useState } from 'react'
import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"


function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.authReducer.userData);
  const userDetails = [
    {
      label: "Full Name",
      default: "Please enter your full name",
      value: currentUser?.fullName,
      name: "fullName",
      type:"text"
    },
    {
      label: "Email Address",
      default: "Please Enter your email address",
      value: currentUser?.email,
      name: "email",
      type:"email"
    },
    {
      label: "Mobile",
      default: "Please enter you mobile",
      value: currentUser?.contactNumber,
      name: "contact",
      type: "number"
    },
    {
      label: "Gender",
      default: "Please enter your gender",
      value: currentUser?.gender,
      name: "gender",
      type:"text"
    },
    {
      label: "Birthday",
      default: "Please enter your birthday",
      value: currentUser?.birthday,
      name: "birthday",
      type:"data",
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData(e.target);
      const data = {}
    } catch (error) {
      
    }
  }
  return (
    <div>
      <div>
        <h1 className='text-2xl tracking-tighter font-medium'>My Profile</h1>
        <div className='my-10'>
          <form onSubmit={handleSubmit} className='grid grid-cols-3 gap-2'>
            {
              userDetails.map((item, ind) => (
                <div key={ind}>
                  <Input disabled={!isEdit} type={item.type} name={item.name} className={``} label={item.label} placeholder={item.default} value={item.value} />
                </div>
              ))
            }
            <div className={`${!isEdit ? "hidden" : "flex"} gap-4 col-span-2`}>
              <button
              type='button'
                className='bg-black text-white/90 mt-4 w-fit py-1 px-5 rounded-md'
                onClick={() => (setIsEdit(false))}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='bg-black text-white/90 mt-4 w-fit py-1 px-5 rounded-md'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className={`${isEdit ? "hidden" : "block"}`}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setIsEdit(true)
            }}
            childern="Edit Profile"
            className='bg-sky-500 hover:bg-sky-700 rounded-md mb-2 text-white tracking-tighter w-[200px] h-[50px] text-lg'
          >Edit</Button>
          <Button
            onClick={() => (navigate("change-password"))}
            childern="Change Password"
            className='bg-sky-500 hover:bg-sky-700 rounded-md text-white tracking-tighter w-[200px] h-[50px] text-lg'
          >Change Password</Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
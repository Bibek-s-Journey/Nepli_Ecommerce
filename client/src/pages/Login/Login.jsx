import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useAddUserMutation, useLogUserMutation } from "../../state/api.js"
import { useDispatch } from 'react-redux'
import { login as signIn } from '../../state/authSlice.js'
import { useNavigate } from 'react-router-dom'
import { Loading, showToast } from '../../state/utilSlice.js'


const Login = () => {
    console.log("login");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [addUser] = useAddUserMutation();
    const [authLogin, {isLoading}] = useLogUserMutation();
    const { register, handleSubmit } = useForm();
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (isLoading) {
            dispatch(Loading({ status: true }));
        } else {
            dispatch(Loading({ status: false }));
        }
    }, [isLoading]);

    
    const login = async (data) => {
        if (isLogin) {
            const response = await authLogin(data);
            if (response?.data?.success) {
                dispatch(signIn({data:response.data.data}));
                dispatch(showToast({ message: response.data.message, status: "Success" }))
                window.history.back();
            } else {
                console.log(response.error.data.message);
                dispatch(showToast({ message: response.error.data.message, status: "Error" }));
            }
        } else {
            const response = await addUser(data);
            if (response.data.success) {
                dispatch(showToast({message: response.data.message, status: "Success"}))
                navigate("/login");
            } else {
                dispatch(showToast({ message: response.error.data.message, status: "Error" }));
            }
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{isLogin ? "Sign in to your account" : "Create an account"}</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(login)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email must be a valid address",
                                }
                            })} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            {
                                isLogin && <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                </div>
                            }
                        </div>
                        <div className="mt-2">
                            <input {...register("password", {
                                required: true,
                            })} id="password" name="password" type="password"

                                autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm px-2 sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type='submit' className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-100">Sign {isLogin ? "in" : "up"}</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    {
                        isLogin ? "Not a member? " : "already have account? "
                    }
                    <span onClick={() => (setIsLogin((prev) => !prev))} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:cursor-pointer ">{isLogin ? "Sign Up" : "Login"}</span>
                </p>
            </div>
        </div>

    )
}

export default Login
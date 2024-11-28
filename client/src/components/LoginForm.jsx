import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import axiosInstance from "../libs/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const LoginForm = () => {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })

    const queryClient = useQueryClient()

    const {mutate: loginMutation, isLoading} = useMutation({
        mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["authUser"]})
            toast.success("you are  logged in")
        },
        onError: (error) => toast.error(error.message)
    })

    const formChangeHandler = (e) => setLoginForm({...loginForm, [e.target.id]: e.target.value})

    const submitHandler = async (e) => {
        e.preventDefault()
        loginMutation(loginForm)
    }

  return <form onSubmit={submitHandler} className='space-y-4 w-full max-w-md'>
			<input
				type='text'
				placeholder='Email'
                id="email"
				value={loginForm.email}
				onChange={formChangeHandler}
				className='input input-bordered w-full'
				required
			/>
			<input
				type='password'
				placeholder='Password'
                id="password"
				value={loginForm.password}
				onChange={formChangeHandler}
				className='input input-bordered w-full'
				required
			/>

			<button type='submit' className='btn btn-primary w-full'>
				{isLoading ? <Loader className='size-5 animate-spin' /> : "Login"}
			</button>
		</form>
};

export default LoginForm;

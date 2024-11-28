import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import axiosInstance from "../libs/axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [signupForm, setSignUpForm] = useState({
        name: "",
        email: "",
        username: "",
        password: ""
    })

    const {mutate: signupMutation, isPending} = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post("/auth/signup", data)
            return res.data
        },
        onSuccess: () => {
            toast.success("Account created successfully")
            queryClient.invalidateQueries({queryKey: ["authUser"]})
        },
        onError: () => toast.error("Something went wrong")
    })

    const submitHander = async (e) => {
        e.preventDefault()
        signupMutation(signupForm)
    }

    const formChangeHandler = (e) => {
        setSignUpForm({...signupForm, [e.target.id]: e.target.value})
    }
    
  return <form onSubmit={submitHander} className="space-y-4">
        <input 
            type="name" 
            id="name"
            placeholder="Name"
            value={signupForm.name}
            className="input input-bordered w-full"
            required
            onChange={formChangeHandler}/>
        <input 
            type="text" 
            id="username"
            placeholder="Username"
            value={signupForm.username}
            className="input input-bordered w-full"
            required
            onChange={formChangeHandler}/>
        <input 
            type="email" 
            id="email"
            placeholder="Email"
            value={signupForm.email}
            className="input input-bordered w-full"
            required
            onChange={formChangeHandler}/>
        <input 
            type="password" 
            id="password"
            placeholder="Password"
            value={signupForm.password}
            className="input input-bordered w-full"
            required
            onChange={formChangeHandler}/>
        <button className="btn btn-primary w-full text-white" disabled={isPending}>
            {isPending? "Loading..." : "Agreed & Join"}
        </button>
  </form>;
};

export default SignUpForm;

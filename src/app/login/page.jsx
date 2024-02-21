"use client"
import React from 'react'

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react'
const Login = () => {

    const [user,setuser] =useState({name:"",email:"",password:""})
    const [loading,setloading] =useState(false)
    const [error,seterror] =useState("")

    const router =useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setloading(true)
        console.log(user)
        try {
          if( !user.email || !user.password){
            seterror("please fill all the fields")
          }
          const res = await signIn("credentials",{
            email:user.email,
            password:user.password,
            redirect:false
          })

          if(res?.error){
            console.log(res)
            seterror("Something went wrong")
          }



          router.push("/dashboard")

        } catch (error) {
          console.log(error)
          seterror("")
        }finally{
          setloading(false)
          

        }
    }
  return (
    <>
        
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       {/* Logo */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit} >
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your Email"
                value={user.email}
                onChange={(e) => setuser({ ...user, email: e.target.value })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter Your Password"
                value={user.password}
                onChange={(e)=>setuser({...user,password:e.target.value})}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading?"Processing":"Log in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  </>
  )
}

export default Login
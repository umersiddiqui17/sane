"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MoonLoader from "react-spinners/MoonLoader";


export const revalidate = 40
export const dynamic = 'force-dynamic'


export default function EditTopic() {
    const {data:session} =useSession()
    const [post,setpost] =useState({name:"",email:"" ,description:"",blog:""})

    const router = useRouter();
  

     const handleSubmit =async(e)=>{
        e.preventDefault()
       console.log(post)
        try {
            if (!post.name || !post.description ||!post.email || !post.blog) {
                toast.error('Please fill all the fields!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    
                    })
                
            }
            const res = await axios.post("/api/topics",post,{cache:false})
            console.log(res)
            router.push("/")


        } catch (error) {
            console.log('Error',error)
        }
     }
  return (
    <div>
         <ToastContainer
         position="bottom-right"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
         
        />
        {session?(
        <form onSubmit={handleSubmit}>
         <div className=' ml-5'>
           
            <label htmlFor="name" className=' text-sm block font-medium leading-6'>Name of the Post:</label>
            <div className='w-1/3 border-indigo-800 border-t'>
                <input id='name' name='name' type="text" placeholder="Topic Name" value={post.name} onChange={(e)=>setpost({...post,name:e.target.value})} className='block w-full rounded-md border-b border-indigo-700 py-1.5 ring-inset ring-indigo-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  outline-none'/>
            </div>
         </div>
         <div className=' ml-5 mt-3'>
            <label htmlFor="description" className=' text-sm block font-medium leading-6'>Description of the Post:</label>
            <div className='w-1/3 border-indigo-800 border-t'>
                <input id='description' name='description' type="text" placeholder="Topic Name" value={post.description} onChange={(e)=>setpost({...post,description:e.target.value})} className='block w-full rounded-md border-b border-indigo-700 py-1.5 ring-inset ring-indigo-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  outline-none'/>
            </div>
         </div>
         <div className=' ml-5 mt-3 '>
           
            <div className='w-1/3 '>
                <input id='description' name='description' type='hidden' placeholder="Topic Name" value={post.email}   className='block w-full rounded-md border-b border-indigo-700 py-1.5 ring-inset ring-indigo-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  outline-none'/>
            </div>
         </div>
         <div className=' ml-5 mt-3'>
            <label htmlFor="blog" className=' text-sm block font-medium leading-6'>Content of the Post:</label>
            <div className='w-2/3 border-indigo-800 border-t'>
                <textarea name="blog" id="" cols="30" rows="10" placeholder="Content of the Post" value={post.blog} onChange={(e)=>setpost({...post,blog:e.target.value})} className='block w-full rounded-md border-b border-indigo-700 py-1.5 ring-inset ring-indigo-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  outline-none px-2 '></textarea>
            </div>
         </div>
         <button type='submit' className='py-2 px-3 ml-5 mt-2 bg-indigo-600 rounded-md hover:bg-indigo-800' onClick={()=>setpost({...post,email:session.user.email})}>Submit</button>
        </form>
        ):(
            <div className=' flex flex-col items-center justify-center mt-12'>
                <div>
                   <MoonLoader
                  color="#37056a"
                  loading
                  size={60}
                /> 
                </div>
                
                <span>Please wait while we get everything ready</span>
            </div>
        )}

    </div>
  )
}

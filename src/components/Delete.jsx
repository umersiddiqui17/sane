"use client"

import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react'
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';


export default function Delete({data}) {
 const {data:session} = useSession()
 
 const isOwner =session && session.user && session.user.email === data.email
 
 
 const id = data._id

 const router = useRouter()

  const removeTopic = async() => {
   try {
      
     const res = await axios.delete(`/api/topics?id=${id}`)
     console.log(res.data)
     if (res) {
       router.refresh()
     }
        
   } catch (error) {
    console.log("Error:",error)
   }
}

const notOwner = () =>{
    toast.error('You dont have permission  !', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        })
}
 

  return (
    <>
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
    <div>

       {isOwner?
       ( 
       <MdDelete className='w-5 h-5 cursor-pointer' onClick={removeTopic}/>
       ):(
        <div>
            <MdDelete className=' w-5 h-5 cursor-not-allowed text-slate-500' />
        </div>
       )}
    
    </div>
    </>
    
  )
}

import axios from 'axios'
import Link from 'next/link';
import React from 'react'
import { CiEdit } from "react-icons/ci";

import Delete from './Delete';

const getTopics = async() =>{
     try {
        const res = await axios.get('http://localhost:3000/api/topics')
       
        return res.data.posts
     } catch (error) {
      console.log("Error:",error)
     }
}
   
export default async function TopicList() {
    const data = await getTopics()
      
  return (
    <div>
        <div className='flex justify-center items-center'>
             <h1 className=' text-2xl md:text-3xl p-4 bg-gradient-to-b from-indigo-500 to-indigo-800 font-serif font-semibold text-transparent bg-clip-text  border-b-4 border-indigo-900'>Topic List</h1>
        </div>
        {data.map((item,index)=>(
          <div key={index}  className='p-4 border border-indigo-400 mt-3 flex '>
            <div className=''>
              <h2>{item.name}</h2>
              <p className='line-clamp-2 text-sm leading-relaxed font-sans text-indigo-300'>{item.description}</p>
            </div>
            <div className='flex '>
              <div className='mt-1'>
                <Link href={`/editTopic/${item._id}`} passHref prefetch>
              <CiEdit className='w-5 h-5'/>
              </Link>
              </div>
              <div className='mt-1 ml-3' >

              <Delete data={data[index]}/>

              </div>
               
            </div>
           
             </div>
        ))}
          
         
             
       
       
    </div>
  )
}

import EditTopic from '@/components/EditTopic'
import axios from 'axios'
import React from 'react'

const getData =async(id)=>{
    try {
      const res = await axios.get(`http://localhost:3000/api/topics/${id}`)
      
     
      return res
    } catch (error) {
      console.log("Error:",error)
    }
  }
export default async function page({params}) {
  const id = params.id
  console.log("id:",id)
  const res = await getData(id)
  console.log(res)
  
  return (
    <div>
        <EditTopic/>
    </div>
  )
}

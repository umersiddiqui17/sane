import { connect } from "@/utils/config/dbConfig"
import Post from "@/utils/models/Post"
import { NextResponse } from "next/server"

connect()
export async function PUT(request,{params}) {
    try {
        await connect()
        const {id} = params
    const {name,description,blog} = await request.json()
    await Post.findByIdAndUpdate(id,{name,description,blog})
    return NextResponse.json({
        message:"post updated successfully",
        success:true
    })
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error.message},{status:500})
    }
    
}

export async function GET(request,{params}){
    try {
        await connect()
        const {id} = params
        const post = await Post.findOne({_id:id})
        return NextResponse.json({
            post,
            success:true
        })
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}
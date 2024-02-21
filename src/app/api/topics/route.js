import { connect } from "@/utils/config/dbConfig"
import Post from "@/utils/models/Post"
import { NextResponse } from "next/server"

 connect()
//  To send the post to the database.
export async function POST(request) {
   
    try { 
        const {name,description,email,blog} = await request.json()
        const newPost = new Post({
            name,description,email,blog
        })
        const SavedPost = await newPost.save()
        

        return NextResponse.json({
            message:"post created successfully",
            success:true,
            SavedPost
        })
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}

// To get the post

export async function GET() {
    try {
        await connect()
        const posts = await Post.find()
        return NextResponse.json({
            posts,
            success:true
        })
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}


// to delete the post


export async function DELETE(request){
    try {
        await connect()
        const id = request.nextUrl.searchParams.get("id")
        const res = await Post.findByIdAndDelete(id)
        if (res) {
             return NextResponse.json({
            message:"post deleted successfully",
            success:true
        })
        }
        return NextResponse.json({
            message:"post not deleted",
            success:false
        })
       
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}
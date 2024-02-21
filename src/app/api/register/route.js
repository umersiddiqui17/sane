import {connect} from "@/utils/config/dbConfig"
import User from "@/utils/models/User"
import bcryptjs from 'bcryptjs'
import { NextResponse } from "next/server"

connect()

export async function POST(req){
    try {
        const {name,email,password} = await req.json()
        
        const ifuserExist = await User.findOne({email})

        if(ifuserExist){
            return NextResponse.json({error:"user already exist"},{status:400})
        }

        const salt = await bcryptjs.genSalt(10)

        const hashedpassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            name,email,password:hashedpassword
        })
        const SavedUser = await newUser.save()
       

        return NextResponse.json({
            message:"user created successfully",
            success:true,
            SavedUser
        })

        
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
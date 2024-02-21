import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL)
        mongoose.connection.on("connected",()=>{
            console.log("Mongodb connected sucessfully")
        })
        mongoose.connection.on("error",(err)=>{
            console.log("Mongodb error" + err)
            process.exit()
        })
    } catch (error) {
        console.log(error)
    }
}
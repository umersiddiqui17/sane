import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the post name"]
    },
    description:{
        type:String,
        required:[true,"please enter the post description"]
    },
    email:{
        type:String,
        required:[true,"please enter the author email"]
    },
    blog:{
        type:String,
        required:[true,"please enter the post content"]
    }
    
},
{
    timestamps: true
})

const Post = mongoose.models.post || mongoose.model("post", PostSchema);

export default Post
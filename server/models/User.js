import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
      lastName:{
        type:String,
        required:true,
        trim:true,
    },
    token: {
        type: String,
    },
    password: {
        type: String,
        required: true,
      },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PostMessage",
    }]
})

const User = mongoose.model("User" , userSchema)

export default User;
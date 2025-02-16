
import mongoose, {Document, Schema} from "mongoose";
import { messageType, messageSchema } from "./message";

// defining interface for the user
export interface userType extends Document{    
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessages: boolean,
    messages: messageType[]                 //type is being defined i.e. it will be an array of messages of type messageType
}

//defining userSchema based on the interface
const userSchema: Schema<userType> = new Schema({
    username: {
        type:String,
        required: [true, "username is required!"],
        trim: true,
        unique: true
    },
    email: {
        type:String,
        required: [true, "email is required!"],
        trim: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email!"]
    },
    password:{
        type: String,
        required: [true, "password is required!"]
    },
    verifyCode: {
        type: String, 
        required: [true, "verify code is required!"]
    },
    verifyCodeExpiry: {
        type: Date,
        default: Date.now,
        required: [true, "verifyCodeExpiry is required!"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true
    },
    messages: [messageSchema],              // array of messages that follows messageSchema

})

const UserModel = (mongoose.models.UserModel as mongoose.Model<userType>) || mongoose.model<userType>("UserModel", userSchema);

export default UserModel;
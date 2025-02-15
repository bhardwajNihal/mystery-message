import mongoose, {Schema,Document} from "mongoose";


//defining message interface: 
//TypeScript would now recognize it as a valid Mongoose document.
    export interface messageType extends Document{      //provides some Document attributes like save()
        content : string;
        createdAt : Date
    }       


//defining message schema based on the interface
    export const messageSchema: Schema<messageType> = new Schema({
        content : {
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            required: true,
            default: Date.now
        }
    })


//finally defining and exporting message model based on the messageSchema

// Since Next.js is serverless, we must prevent redefining the model multiple times, which can cause errors. 
// To handle this, we use mongoose.models to check if the model already exists before defining it.

const Message = (mongoose.models.Message as mongoose.Model<messageType>) || mongoose.model<messageType>("Message",messageSchema);

export default Message;

//In Next.js, server-side code runs on demand, so this prevents issues when models are re-registered on each request.
// mongoose.models.Message checks if the model already exists.
// If it exists, reuse it instead of redefining.
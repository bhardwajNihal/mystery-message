import { messageType } from "../models/message";

// defining the Api response type explicitely to reuse and get type suggestions
export interface ApiResponseType{
    success: boolean;
    message: string;
    messages?: Array<messageType>           //optional attributes to send data when required
    isAcceptingMessage?: boolean
}
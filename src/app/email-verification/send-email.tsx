import { resend } from "./resend-instance";
import VerificationEmailTemplate from "./verificationEmailTemplate";
import { ApiResponseType } from "../types/apiResponse";

interface verificationEmailProps{
    username:string;
    email:string;
    verifyCode:string
}

export async function SendVerificationEmail(
    {username,email,verifyCode}:verificationEmailProps
)
: Promise<ApiResponseType> {                       //returns a promise in apiResponse format  

    try {
        
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystry Message | Verification code',
            react: VerificationEmailTemplate({username:username, otp:verifyCode})
          });

        return{
            success:true,
            message: "Verification Email sent Successfully!"
        }

    } catch (error) {
        console.error("Error while sending Verification Email!",error);
        return {
            success:false,
            message: "Failed sending Verification Email"
        }
        
    }

}
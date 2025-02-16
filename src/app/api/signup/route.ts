//defining signup endpoint
import connectToDB from "@/app/lib/dbConnection";
import { SendVerificationEmail } from "@/app/email-verification/send-email";
import UserModel from "@/app/models/user";
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){            //nextjs route handlers take only 1 parameter
    connectToDB();

    try {
        const {username, email, password} = await req.json();
        
    // Case1 :Check if Username is already taken, and email associated to that is verified. Simply means that the user has already registered
    // A username should only be considered "taken" if its owner has verified their email.
    // This allows users who registered but didn’t verify their email to re-register using the same username.
        const findUserByUsername = await UserModel.findOne({
            username,
            isVerified:true
        });
        if(findUserByUsername){
            return NextResponse.json({
                success:false,
                message:"Username Already taken!"
            },{status:411})
        }

    //case2: Check if Email already exists
        const findUserByEmail = await UserModel.findOne({
            email
        })
        const verifyCode = Math.floor(Math.random()*900000 + 100000).toString();

        //case-2.1 : if email already exists
        if(findUserByEmail){        
        
            //case-2.1.A : if email is verified
            if(findUserByEmail.isVerified){
                return NextResponse.json({
                    success: false,
                    message: "Email already registered! Try using a different one."
                },{status:411})
            }
            else{       // if not verified, then update given credentials
                const hashedPassword = await bcrypt.hash(password,10);
                findUserByEmail.password = hashedPassword;
                findUserByEmail.verifyCode = verifyCode;
                findUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
            }

        }
        //case-2.2 : if email doesn't exist, simply register the user
        else{                       
            const hashedPassword = await bcrypt.hash(password,10);
            const verifyCodeExpiry = new Date();
            verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1)
            
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry,
                isVerified: false,
                isAcceptingMessages: true,
                messages : []
            })
            await newUser.save()
        }

    //finally, Sending Verification email
        const emailResponse = await SendVerificationEmail({
            username,email,verifyCode
        })
        if(!emailResponse.success){          
            return NextResponse.json({
                success: false,
                message: emailResponse.message
            },{status:411})
        }
        return NextResponse.json({
            success: true,
            message: "OTP sent Successfully! Please Verify your Email."
        },{status:201})


    } catch (error) {
        console.error("Error while registering user!",error);
        return NextResponse.json({
            success:false,
            message:"Error while Registering user!"
        },
        {status:411})
    }

}



// NextRequest gives you extra utilities like req.cookies and req.nextUrl for better URL handling.
// NextResponse.json() is optimized for Next.js caching and streaming.
// In Next.js API routes → Always use NextRequest and NextResponse.
// In middleware and client-side fetch → Use standard Request and Response.
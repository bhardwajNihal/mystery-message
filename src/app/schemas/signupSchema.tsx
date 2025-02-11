import { z } from "zod"

// defining validation schema for userdata to be used in signUp
// signup schema needs to be stricter as the data is stored in the database, so as to maintain consistency
export const signupSchema = z.object({
    username: z
    .string()
    .min(2, "Username should not be less than 2 characters!")
    .max(100, "Username should not be more than 100 characters!")
    .regex(/^[a-zA-Z0-9]+$/, "Username should not contain any special characters!"),

    email : z
    .string()
    .email({message: "Invalid Email!"}),

    password : z
    .string()
    .min(6,{message: "Password must be atleast 6 characters long!"})
})
import { z } from "zod";

// defining validation schema for the code to verify user

export const verifySchema = z.object({
    code : z
    .string()
    .length(6, "Verification code should be of 6 characters!")
})
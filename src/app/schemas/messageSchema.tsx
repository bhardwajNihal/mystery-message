import { z } from "zod";

export const messageSchema = z.object({
    content : z
    .string()
    .min(2, "content should atleast be atleast 2 characters long!")
    .max(300, "content should no longer than 300 characters!")
})
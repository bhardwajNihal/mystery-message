import { z } from "zod";

// signin schema can be bit lenient, as it's just required to check if user is registered already
export const signinSchema = z.object({
    identifier : z.string(),        // can be username of email
    password : z.string(),
})
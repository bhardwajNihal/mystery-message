import {Resend} from "resend";

//initializing the resend instance, exporting it to reuse
export const resend = new Resend(process.env.RESEND_API_KEY) 
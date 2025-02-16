
# A mystery-message app 
- with Next, Ts, mongo, express a bit of AI integration, using chatgpt api
- with some advanced typescripts concepts, strict type checking with zod inference


# setup :
- Initialize a fresh next app >> npx create-next-app@latest

1. defined models for database - with stricter types of schemas, and different export syntax, for serverless nextjs

2. made a 'schemas' directory for general validations of incoming datas, using zod
3. Define the type for Api Response (a good practice to standardize and enhance reusability)

4. connected to Database, avoiding duplicate connections

5. added email verification, using Resend (popular email-sending service, often used for transactional emails. It works well with React for templating.)
    - Using Resend : 
        - npm i resend  >> import {Resend} from 'resend'
        - sent resend Api key in the .env >> import it and initialize a resend instance
        - Setup email-template to be sent, using react-email (npm install @react-email/components)
        - Finally define a function to send verification email using resend and email-template

6. Finished Signup endpoint 
    - consider two scenarios :
    i. if user doesn't exists - simple >> add the user
    ii. if user already exists 
        i. if verified >> return false
        ii. if not verified >> add the updated user. It simply means the user previously didn't verified itself while signup, and now trying to signup again with the same email. if verified this time save the updated username in the db.
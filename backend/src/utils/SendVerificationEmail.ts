import fs from 'fs/promises'
import jwt from 'jsonwebtoken'
import path from "path";

import {Transporter} from './Transporter'
import {GenerateJwt} from "./JWT";

export interface MailOptions {
    from: string | undefined;
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export const SendVerificatioEmail = async ({email, htmlPath}:{email:string, htmlPath?:string}):Promise<void | null> => {
    try{
        const mailOptions:MailOptions = {
            from: process.env.GMAIL_USER as string,
            to: email,
            subject: "Email Verification",
            text: "This is the test email verification",
            html: htmlPath,
        }

        if(mailOptions.html !== undefined){
            const htmlContent:string = await fs.readFile(mailOptions.html,'utf8')

            // JWT Token
            const token:string | null = GenerateJwt({email},{expiresIn: '2m'})
            if(token == null){
                return null
            }

            const verificationLink:string = `http://localhost:7000/api/v1/auth/email-verification/${token}`
            mailOptions.html = htmlContent.replace(/%%VERIFICATION_LINK%%/g, verificationLink)
        }
        await Transporter.sendMail(mailOptions);
    }
    catch(error){
        console.log(error)
    }
}
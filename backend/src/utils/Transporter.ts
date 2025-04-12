import nodemailer from "nodemailer";

export const Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER as string,
        pass: process.env.GMAIL_PASSWORD as string,
    }
})

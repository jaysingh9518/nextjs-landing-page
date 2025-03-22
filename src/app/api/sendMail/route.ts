import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import Lead from '@/models/Lead';

export async function POST(req: NextRequest) {
    const { name, email, mobile, travelDate, guests, message, travelPackage } = await req.json();

    if (!name || !email || !mobile) {
        return NextResponse.json({ error: 'Name, email, and Mobile are required.' }, { status: 400 });
    }

    await connectDB();

    try {
        // Save data to MongoDB
        await Lead.create({
            name,
            email,
            mobile,
            travelPackage,
            travelDate,
            guests,
            message
        });

        // Send email to admin
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT), 
            secure: true, // Use SSL (recommended for Hostinger)
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const leadEmail = {
            from: `"Make My Travls" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL, // Admin email from .env
            subject: "New Lead Received - Enquiry Form Submission",
            html: `<html>
                <body>
                    <h2>New Lead Details</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>mobile:</strong> ${mobile}</p>
                    <p><strong>Travel Package:</strong> ${travelPackage || ""}</p>
                    <p><strong>Travel Date:</strong> ${travelDate || ""}</p>
                    <p><strong>Travelers:</strong> ${guests || ""}</p>
                    <p><strong>Message:</strong> ${message || 'No message provided.'}</p>
                    <p>Thank you!</p>
                </body>
            </html>`
        };

        await transporter.sendMail(leadEmail)
        
        return NextResponse.json({ success: 'Email sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ error: 'Failed to send emails. Please try again.' }, { status: 500 });
    }
}

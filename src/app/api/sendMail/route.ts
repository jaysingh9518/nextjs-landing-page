import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { name, email, phone, travelDate, guests, message } = await req.json();

    if (!name || !email || !phone) {
        return NextResponse.json({ error: 'Name, email, and phone are required.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT), 
        secure: true, // Use SSL (recommended for Hostinger)
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Your Hostinger email
        subject: `New Inquiry from ${name}`,
        html: `
            <h3>New Inquiry Details</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Travel Date:</b> ${travelDate}</p>
            <p><b>Guests:</b> ${guests}</p>
            <p><b>Message:</b> ${message || 'No message provided.'}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: 'Email sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 });
    }
}

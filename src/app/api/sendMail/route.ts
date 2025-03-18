import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { name, email, mobile, travelDate, guests, message, travelPackage } = await req.json();

    if (!name || !email || !mobile) {
        return NextResponse.json({ error: 'Name, email, and Mobile are required.' }, { status: 400 });
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

    const confirmationEmail = {
        from: `"Make My Travls" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Enquiry Form Submission Confirmation!",
        html: `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .email-container {
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                max-width: 600px;
                margin: auto;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .image {
              text-align: center;
              padding-bottom: 5px;
            }
            .header {
                background: #0073e6;
                color: #ffffff;
                text-align: center;
                padding: 15px;
                border-radius: 10px 10px 0 0;
                font-size: 20px;
                font-weight: bold;
            }
            .content {
                padding: 20px;
                font-size: 16px;
                color: #333;
            }
            .highlight {
                background: #f8f9fa;
                padding: 10px;
                border-left: 4px solid #0073e6;
                font-weight: bold;
                margin: 15px 0;
            }
            .footer {
                background: #f4f4f4;
                text-align: center;
                padding: 15px;
                font-size: 14px;
                color: #555;
                border-radius: 0 0 10px 10px;
            }
            .contact-details {
                margin-top: 15px;
                font-size: 14px;
                color: #555;
            }
            .contact-details a {
                color: #0073e6;
                text-decoration: none;
            }
            .button {
                color: #000000;
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                display: inline-block;
                padding: 10px 20px;
                text-decoration: underline;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="image"><img src="https://makemytravls.com/static/media/makemytravls.5df9ace42a319f3b7fae.png" alt="Make My Travls" width="300" /></div>
            <div class="header">Thank You for Your Enquiry!</div>
            <div class="content">
                <p>Hello <strong>${name}</strong>,</p>
                <p>Thank you for reaching out to us! We have received your enquiry for the following travel package:</p>
                <div class="highlight">
                    ✈ <strong> Himachal tour package</strong>
                </div>
                <p>Our team will get back to you shortly with further details.</p>
                <p>Meanwhile, explore more exciting packages on our website.</p>
                <a href="https://www.makemytravls.com" class="button">Visit Our Website</a>
            </div>
            <div class="footer">
                <p><strong>Make My Travls</strong></p>
                <p class="contact-details">
                    &#128205; Address: Khasra No. 513, House No. 31/PN/397, Prem Nagar, Rajpur Chungi, Shamshabad Road, Agra, Uttar Pradesh - 282001<br>
                    &#128222; Mobile: <a href="tel:+919997365898">+91-9997365898</a><br>
                    &#9742; Telephone: <a href="tel:+915624338313">0562-4338313</a><br>
                    &#128231; Email: <a href="mailto:info@makemytravls.com">info@makemytravls.com</a><br>
                    &#127760; Website: <a href="https://www.makemytravls.com">www.makemytravls.com</a>
                </p>
            </div>
        </div>
    </body>
    </html>` // Add the provided HTML content for confirmation email here
    };

    const leadEmail = {
        from: `"Make My Travls" <${process.env.EMAIL_USER}>`,
        to: process.env.RECEIVER_EMAIL, // Admin email from .env
        subject: "New Lead Received - Enquiry Form",
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

    try {
        await Promise.all([
            transporter.sendMail(confirmationEmail),
            transporter.sendMail(leadEmail)
        ]);
        return NextResponse.json({ success: 'Emails sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ error: 'Failed to send emails. Please try again.' }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import Lead from '@/models/Lead';

export async function POST(req: NextRequest) {
    await connectDB();

    const { name, email, mobile, travelPackage, travelDate, guests, message } = await req.json();

    if (!name || !email || !mobile) {
        return NextResponse.json({ error: 'Name, email, and mobile are required.' }, { status: 400 });
    }

    try {
        const newLead = await Lead.create({
            name,
            email,
            mobile,
            travelPackage,
            travelDate,
            guests,
            message
        });

        return NextResponse.json({ success: 'Lead saved successfully!', data: newLead }, { status: 201 });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to save lead. Please try again.' }, { status: 500 });
    }
}

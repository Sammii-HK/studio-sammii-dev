import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, budget, message, website } = body;

    // Honeypot check
    if (website) {
      return NextResponse.json({ message: "Thank you for your message! I'll get back to you within 24 hours." }, { status: 200 });
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Push notification
    await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: process.env.PUSHOVER_API_TOKEN,
        user: process.env.PUSHOVER_USER_KEY,
        title: `New enquiry from ${name}`,
        message: `${email}${company ? ` — ${company}` : ""}${budget ? ` (${budget})` : ""}\n\n${message}`,
        priority: 0,
      }),
    });

    return NextResponse.json(
      { message: "Thank you for your message! I'll get back to you within 24 hours." },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

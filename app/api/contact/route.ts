import { NextResponse } from "next/server";
import { Resend } from "resend";

// Intialize later or with empty string to prevent build time errors when env var is missing
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");
const destinationEmail = process.env.CONTACT_EMAIL || "hello@example.com";

// Simple in-memory rate limiting (for demonstration, in production use Redis/Upstash)
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOWMs = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimit.get(ip);

    if (!record || now - record.lastReset > RATE_LIMIT_WINDOWMs) {
        rateLimit.set(ip, { count: 1, lastReset: now });
        return false;
    }

    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    record.count++;
    return false;
}

export async function POST(req: Request) {
    try {
        // Basic rate limiting using IP
        const ip = req.headers.get("x-forwarded-for") || "unknown";
        if (isRateLimited(ip)) {
            return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
        }

        const body = await req.json();
        const { name, email, message, website } = body;

        // Honeypot check
        if (website) {
            return NextResponse.json({ error: "Bot detected" }, { status: 400 });
        }

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is not set");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        // Send email
        const data = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>", // Or your verified domain
            to: destinationEmail,
            subject: `New contact from ${name} via Portfolio`,
            replyTo: email,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
        });

        if (data.error) {
            return NextResponse.json({ error: data.error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.log("Mock Email Sending:", {
        to: "portfolio@example.com",
        from: email,
        subject: `[Contact Form] ${subject}`,
        body: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      });

      // Artificial delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return NextResponse.json({
        success: true,
        message: "Message logged successfully (Development Mode)."
      });
    }

    const resend = new Resend(resendApiKey);

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["nadeemmd.0105@gmail.com"], // Change this to recipient email
      replyTo: email,
      subject: `[Portfolio Website] ${subject}`,
      html: `
        <h3>New Portfolio Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error: unknown) {
    console.error("Contact form API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

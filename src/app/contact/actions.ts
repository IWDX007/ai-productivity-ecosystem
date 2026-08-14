"use server";

import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";

export async function submitContactForm(formData: FormData) {
  try {
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const subject = (formData.get("subject") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !email || !message) {
      return { success: false, error: "Please fill in all required fields" };
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: "Invalid email address" };
    }

    await db.insert(contactMessages).values({
      name,
      email,
      subject: subject || null,
      message,
    });

    return { success: true };
  } catch (err) {
    console.error("Contact form error:", err);
    return { success: false, error: "Failed to send message. Please try again." };
  }
}